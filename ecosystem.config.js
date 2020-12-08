module.exports = {
  apps: [{
    name: "nest",
    script: "dist/src/main.js",
    // args: [],
    // node_args: "-r dotenv/config",
    instances: "max",
    exec_mode: "cluster",
    max_memory_restart: "300M",
    error_file: "/dev/null",
    out_file: "/dev/null",
    log_file: "log/combined.log",
    merge_logs: true,
    time: true
  }],
};
