import * as z from "zod";

const JobZod = z.object({ 
  name: z.string(),
  position: z.string(),
  url: z.string(),
  startDate: z.date(),
  endDate: z.optional(z.date()),
  summary: z.string(),
  highlights: z.array(z.string())
});



export type Job = z.infer<typeof JobZod>;
