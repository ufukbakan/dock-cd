import { schema } from "bootpress/helpers";

export const pipelineRequestDto = schema({
    image: "string",
    repo: "string",
    command: "string"
});

export type PipelineRequest = typeof pipelineRequestDto;