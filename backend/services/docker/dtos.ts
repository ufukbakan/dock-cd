import { schema } from "bootpress/helpers";

export const pipelineRequestDto = schema({
    image: "string",
    commands: "string"
});

export type PipelineRequest = typeof pipelineRequestDto;