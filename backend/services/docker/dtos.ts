import { schema } from "bootpress/helpers";

export const pipelineRequestDto = schema({
    container: "string",
    commands: "string"
});

export type PipelineRequest = typeof pipelineRequestDto;