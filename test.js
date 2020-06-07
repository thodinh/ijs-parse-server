var IJSServer = require('ijs-server');
var Parse = require('parse/node')
var server = new IJSServer({
    $_name: 'IJS',
    config: {
        log_dir: "logs",
        log_filename: "[component].log",
        log_columns: ["hires_epoch", "date", "hostname", "pid", "component", "category", "code", "msg", "data"],
        log_archive_path: "logs/archives/[yyyy]/[mm]/[dd]/[filename]-[yyyy]-[mm]-[dd].log.gz",
        log_crashes: "true",
        copy_job_logs_to: "",
        queue_dir: "queue",
        pid_file: "logs/ijs2.pid",
        debug_level: "5",
        debug: true,
        echo: true,
        color: "white",
        foreground: true,
        IJSParseServer: {
            port: 1338
        }
    },
    components: [
        require('./index')
    ]
})

server.startup()
    .then(server => {
        server.IJSParseServer.on('server-started', () => {
            server.logDebug(3, 'Server started!')
        })
    })