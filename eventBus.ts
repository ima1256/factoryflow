import mitt from "mitt";

import type { Events } from "./types";

const eventBus = mitt<Events>();

export default eventBus;
