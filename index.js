// Importing required modules
const si = require('systeminformation');
const fs = require('fs');
const path = require('path'); 
const { EventEmitter } = require('events'); 

class SystemMonitorError extends Error {
    constructor(message, type) {
        super(message); 
        this.name = "SystemMonitorError"; 
        this.type = type; 
    }
}


function logToSystemFile(data) {
    const logStream = fs.createWriteStream(path.join(__dirname, 'system.log'), { flags: 'a' });
    
    logStream.write(JSON.stringify(data) + '\n', 'utf8', (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        } else {
            console.log('System stats logged successfully');
        }
    });
}


const alertEmitter = new EventEmitter();

alertEmitter.on('alert', (alert) => {
    console.log(`ALERT: ${alert.type} - ${alert.message}`);
});


async function monitorSystem() {
    try {
        
        const [cpu, memory, disk] = await Promise.all([
            si.currentLoad(),
            si.mem(),        
            si.fsSize()      
        ]);

        
        const stats = {
            time: new Date().toISOString(), //
            cpu: {
              
                currentLoad: cpu.currentLoad,
                avgLoad: cpu.avgLoad
            },
            memory: {
                total: memory.total,
                used: memory.used,
                free: memory.free,
                
                usagePercentage: (memory.used / memory.total) * 100
            },
            disk: {
                
                size: disk[0].size,
                used: disk[0].used,
                available: disk[0].available,
               
                usePercentage: disk[0].use
            }
        };

      
        logToSystemFile(stats);

   
        if (stats.memory.usagePercentage > 90) {
            alertEmitter.emit('alert', {
                type: 'Memory',
                message: 'High memory usage detected'
            });
            throw new SystemMonitorError('Memory usage is over 90%', 'Memory');
        }

      
        if (stats.cpu.currentLoad > 75) {
            alertEmitter.emit('alert', {
                type: 'CPU',
                message: 'CPU load is very high'
            });
        }

        // Disk space alert
        if (stats.disk.usePercentage > 85) {
            alertEmitter.emit('alert', {
                type: 'Disk',
                message: 'Low disk space'
            });
        }

    } catch (err) {
        if (err instanceof SystemMonitorError) {
            console.error(`${err.type} Error: ${err.message}`);
        } else {
            console.error('Unexpected error while monitoring:', err);
        }
    }
}


setInterval(() => {
    monitorSystem();
}, 5000);


monitorSystem();