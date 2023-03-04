import cluster from 'node:cluster';
import { cpus } from 'node:os';
import process from 'node:process';

export const clusterize = (callback: () => Promise<void>): void => {

  if (cluster.isPrimary) {
    console.log('Start master server');
    for (let i = 0; i < cpus().length; i += 1) cluster.fork();
    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} is dead. Restarting...`);
      cluster.fork();
    });
  } else {
    console.log(`Cluster server started in ${process.pid}`);
    callback();
  }
};