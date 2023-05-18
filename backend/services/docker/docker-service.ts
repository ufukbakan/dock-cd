import { RestService } from "bootpress";
import { PipelineRequest } from "./dtos";
import Docker from "dockerode";
import { config } from "dotenv";
import tar from "tar";
import path from "path";
import { dockerEvents } from "./docker-analytics";
config();

const {
    DOCKER_HOST,
    DOCKER_PORT
} = process.env;

const docker = new Docker({ host: DOCKER_HOST, port: DOCKER_PORT });

class DockerService {
    runPipeline(pipelineRequest: PipelineRequest) {
        const image = pipelineRequest.image;
        // let clonePath = path.resolve(process.cwd(), "cloned");
        // console.log(`clone path:${clonePath}`);

        return new Promise(async (resolve, reject) => {
            try {
                await this.#prepareImage(image);
                const container = await docker.createContainer({
                    Image: image,
                    AttachStdin: false,
                    AttachStderr: false,
                    AttachStdout: false,
                    OpenStdin: false,
                    StdinOnce: false,
                    HostConfig: {
                        Binds: ["shared_volume:/shared"]
                    },
                    Tty: true
                })
                await container.start();
                dockerEvents.emit("start", container.id);
                resolve(null);
            }
            catch (e) {
                reject(e);
            }
        })
    }

    async #prepareImage(image: string) {
        const images = await this.#listImages();
        const isAlreadyPulled = images.some(i => i.RepoTags?.find(tag => tag == image));
        if (!isAlreadyPulled) {
            console.log("pulling image", image);
            await docker.pull(image);
        }
        console.log("image is already pulled", image)
    }

    #listImages(): Promise<Docker.ImageInfo[]> {
        return new Promise((resolve, reject) => {
            docker
                .listImages()
                .then(images => resolve(images))
                .catch(err => reject(err));
        });
    }

    getasync() {
        return new Promise((r) => r(null));
    }
}

export default RestService(DockerService);