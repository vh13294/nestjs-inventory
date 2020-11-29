module.exports = {
  apps: [{
    name: "nest",
    script: "./dist/src/main.js",
    instances: "max",
    exec_mode: "cluster",
    max_memory_restart: "300M",
    env: {
      "PORT": 3000,
      "NODE_ENV": "production",
    },
    error_file: "./log/err.log",
    out_file: "./log/out.log",
    log_file: "./log/combined.log",
    merge_logs: true,
    time: true
  }],
};
