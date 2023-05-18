import { EventEmitter } from "stream";

type DockerEventNames =
    | "start"
    | "end"
    | "stop";

type DockerEventArgs = {
    "start": [string],
    "end": [string],
    "stop": [string]
}

interface DockerEventEmitter extends EventEmitter {
    emit: <T extends DockerEventNames>(eventName: T, ...args: DockerEventArgs[T]) => boolean;
}

export const dockerEvents = new EventEmitter() as DockerEventEmitter;

dockerEvents.on("start", (containerID: string) => {
    console.log(`Container ${containerID} is started`);
});

dockerEvents.on("end", (containerID: string) => {
    console.log(`Container ${containerID} is finished processing`);
});

dockerEvents.on("stop", (containerID: string) => {
    console.log(`Container ${containerID} is stopped`);
});