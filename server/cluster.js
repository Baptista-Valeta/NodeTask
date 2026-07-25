const cluster = require('cluster');
const os = require('os');

const CPUs = os.cpus();

// isMaster(old) or isPrimary(modern)
if(cluster.isPrimary) {
    CPUs.forEach(() => cluster.fork());
    cluster.on('listening', worker => {
        console.log('Cluster %d conectado.', worker.process.pid);
    });
    cluster.on('disconnect', worker => {
        console.log('Cluster %d desconectado.', worker.process.pid);
    });
    cluster.on('exit', worker => {
        console.log('Cluster %d fora do ar', worker.process.pid);
        cluster.fork();
    });
}else {
    require('./src/index');
}