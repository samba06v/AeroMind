# Admin Panel Guide - AeroMind Nexus

## 🎯 Overview

The Admin Panel provides comprehensive system management, monitoring, and analytics capabilities for the AeroMind Nexus platform.

**Access URL:** http://localhost:5000/admin

---

## 📊 Dashboard Tab

### Key Metrics
- **Total Users** - Current user count with growth percentage
- **API Requests** - Total API calls in the last period
- **Active Sessions** - Currently active user sessions
- **System Uptime** - Platform availability percentage

### Recent Activity Feed
Real-time stream of system events including:
- User registrations
- API rate limit warnings
- Database operations
- Failed login attempts
- ML model updates

### System Health Monitor
Live status of all services:
- ✅ API Server
- ✅ Database (PostgreSQL)
- ✅ ML Services
- ✅ WebSocket Server
- ✅ Analytics Engine

Each service shows:
- Current status (operational/degraded/down)
- Uptime percentage
- Last health check timestamp

---

## 📈 Analytics Tab

### Performance Metrics
- **Total Predictions** - ML model inference count
- **Avg Response Time** - API endpoint latency
- **Success Rate** - Request success percentage
- **Data Processed** - Total data volume handled

### API Usage Table
Detailed breakdown by endpoint:
- Endpoint path
- Request count
- Average response time
- Success rate
- Current health status

**Top Endpoints:**
1. `/api/ml/predict-delay` - Flight delay predictions
2. `/api/ml/network-status` - Network monitoring
3. `/api/ai/gnn-propagation` - Graph neural network analysis
4. `/api/ai/lstm-forecast` - Time series forecasting
5. `/api/analytics/time-series` - Statistical analysis

---

## 👥 Users Tab

### User Management Features

#### View Users
- Searchable user list
- Filter by role, status, activity
- Sort by any column
- Pagination support

#### User Information
- Name and email
- Role (Admin, User, Analyst)
- Status (Active, Inactive)
- Last login timestamp
- Account creation date

#### Actions
- **Edit User** - Update user details and permissions
- **Delete User** - Remove user account
- **Add New User** - Create new user accounts

#### User Roles
- **Admin** - Full system access
- **Analyst** - Analytics and reporting access
- **User** - Standard platform access

---

## 🖥️ System Monitoring Tab

### Resource Metrics

#### CPU Usage
- Current utilization percentage
- Historical trends
- Alert thresholds

#### Memory
- Used vs Total memory
- Heap usage statistics
- Memory leak detection

#### Disk Space
- Storage utilization
- Database size
- Log file sizes

#### Network
- Incoming/outgoing bandwidth
- Connection count
- Latency metrics

### Service Status
Detailed information for each service:
- Service name
- Port number
- Process ID (PID)
- Current status
- Restart capability

### System Logs
Real-time log viewer with:
- Timestamp
- Log level (INFO, WARN, ERROR)
- Message content
- Source service
- Filter and search capabilities

**Log Levels:**
- 🟢 **INFO** - Normal operations
- 🟡 **WARN** - Potential issues
- 🔴 **ERROR** - Critical problems

---

## ⚙️ Settings Tab

### General Settings

#### Site Configuration
- **Site Name** - Platform display name
- **API Base URL** - Backend endpoint URL
- **Max Concurrent Users** - Connection limit

### ML Model Settings

#### Model Configuration
- **Model Version** - Current ML model version
- **Confidence Threshold** - Prediction confidence minimum
- **Batch Size** - Inference batch processing size

### Security Settings

#### Authentication
- **Two-Factor Authentication** - Enable/disable 2FA
- **Session Timeout** - Auto-logout duration (minutes)
- **Password Policy** - Complexity requirements

#### API Security
- **Rate Limiting** - Requests per minute limit
- **IP Whitelist** - Allowed IP addresses
- **API Key Management** - Generate and revoke keys

### Save Changes
All settings changes require confirmation before applying.

---

## 🔧 Common Admin Tasks

### 1. Monitor System Health
```
1. Navigate to Dashboard tab
2. Check "System Health" panel
3. Verify all services show "operational"
4. Review uptime percentages
```

### 2. Analyze API Performance
```
1. Go to Analytics tab
2. Review "API Usage by Endpoint" table
3. Identify slow endpoints (>500ms)
4. Check success rates (<95% needs attention)
```

### 3. Manage Users
```
1. Open Users tab
2. Use search to find specific user
3. Click "Edit" to modify details
4. Click "Delete" to remove user
5. Click "Add New User" to create account
```

### 4. Review System Logs
```
1. Navigate to System tab
2. Scroll to "Recent Logs" section
3. Filter by log level if needed
4. Click log entry for details
```

### 5. Update Settings
```
1. Go to Settings tab
2. Modify desired settings
3. Click "Save Changes"
4. Confirm changes in modal
```

---

## 🚨 Troubleshooting

### High CPU Usage
1. Check System Monitoring tab
2. Review active processes
3. Identify resource-intensive operations
4. Consider scaling or optimization

### API Errors Increasing
1. Check Analytics tab
2. Identify failing endpoints
3. Review error logs in System tab
4. Check service health status

### Database Connection Issues
1. Verify PostgreSQL service status
2. Check connection count
3. Review database logs
4. Restart database service if needed

### User Login Problems
1. Check Recent Activity for failed attempts
2. Verify user status is "active"
3. Check session timeout settings
4. Review authentication logs

---

## 📊 Metrics Explained

### System Metrics
- **CPU %** - Processor utilization (0-100%)
- **Memory** - RAM usage in GB
- **Disk** - Storage usage in GB
- **Network** - Bandwidth in Mbps

### API Metrics
- **Requests** - Total API calls
- **Avg Time** - Mean response time in ms
- **Success Rate** - Percentage of successful requests
- **Errors** - Count of failed requests

### User Metrics
- **Total** - All registered users
- **Active** - Users with recent activity
- **Inactive** - Users without recent activity
- **New Today** - Registrations in last 24 hours

---

## 🔐 Security Best Practices

1. **Regular Monitoring**
   - Check dashboard daily
   - Review activity logs weekly
   - Audit user access monthly

2. **Access Control**
   - Use role-based permissions
   - Enable 2FA for admins
   - Rotate API keys regularly

3. **System Maintenance**
   - Update ML models regularly
   - Monitor resource usage
   - Backup database daily

4. **Incident Response**
   - Set up alert thresholds
   - Document incidents
   - Review and improve processes

---

## 📞 Support

For admin panel issues:
- **Email:** admin@aeromindnexus.com
- **Documentation:** http://localhost:5000/admin/docs
- **API Reference:** See API_DOCUMENTATION.md

---

## 🎓 Training Resources

### Video Tutorials
- Admin Panel Overview (10 min)
- User Management Guide (5 min)
- System Monitoring Tutorial (8 min)
- Settings Configuration (6 min)

### Documentation
- API Documentation
- System Architecture Guide
- Security Best Practices
- Troubleshooting Guide

---

**Admin Panel Version:** 1.0.0
**Last Updated:** 2026-02-17
**Status:** ✅ Fully Operational
