import { RestService } from "bootpress";
import { PipelineRequest } from "./dtos";

class DockerService {
    runPipeline(pipelineRequest: PipelineRequest) {
        return pipelineRequest.container;
    }
}

export default RestService(DockerService);