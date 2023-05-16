import { PassBodyAs } from "bootpress";
import { Router } from "express";
import { pipelineRequestDto } from "../services/docker/dtos";
import DockerService from "../services/docker/docker-service";

export const basepath = "/docker";
export const router = Router();

router.post("/", PassBodyAs(pipelineRequestDto)(DockerService.runPipeline))
// router.get("/images", DockerService.);
router.get("/async", DockerService.getasync());