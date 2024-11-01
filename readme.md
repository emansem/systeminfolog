# System Monitor

A Node.js application for real-time system monitoring that tracks CPU, memory, and disk usage while providing automated alerts for critical system states.

## Features

- Real-time monitoring of system resources
- Automated alerts for critical system states
- Continuous logging of system statistics
- Custom error handling for system monitoring events
- Event-driven architecture for alert management

## Prerequisites

- Node.js (v12.0.0 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd system-monitor
```

2. Install dependencies:
```bash
npm install
```

Required dependencies:
- `systeminformation`: For collecting system metrics
- `fs`: For file system operations (built-in)
- `path`: For path operations (built-in)
- `events`: For event handling (built-in)

## Usage

To start the monitoring system:

```bash
node index.js
```

The application will:
- Start monitoring system resources every 5 seconds
- Log statistics to `system.log`
- Display alerts in the console when thresholds are exceeded

## Monitoring Thresholds

The system monitors the following metrics with their respective thresholds:

- **Memory Usage**: Alert when usage exceeds 90%
- **CPU Load**: Alert when current load exceeds 75%
- **Disk Space**: Alert when usage exceeds 85%

## Data Collection

The monitor collects the following system information:

### CPU
- Current Load
- Average Load

### Memory
- Total Memory
- Used Memory
- Free Memory
- Usage Percentage

### Disk
- Total Size
- Used Space
- Available Space
- Usage Percentage

## Logging

System statistics are continuously logged to `system.log` in JSON format. Each log entry includes:
- Timestamp
- CPU metrics
- Memory metrics
- Disk metrics

Example log entry:
```json
{
  "time": "2024-11-01T10:00:00.000Z",
  "cpu": {
    "currentLoad": 45.8,
    "avgLoad": 42.3
  },
  "memory": {
    "total": 16777216000,
    "used": 8388608000,
    "free": 8388608000,
    "usagePercentage": 50.0
  },
  "disk": {
    "size": 250790436864,
    "used": 185790436864,
    "available": 65000000000,
    "usePercentage": 74.1
  }
}
```

## Error Handling

The application includes custom error handling through the `SystemMonitorError` class, which provides:
- Custom error types
- Detailed error messages
- Specific error handling for different monitoring components

## Event System

The application uses Node.js's EventEmitter for alert handling:
- Alerts are emitted as events
- All alerts are logged to the console
- Different alert types (Memory, CPU, Disk) are handled separately


## License

This project is licensed under the MIT License - see the LICENSE file for details.