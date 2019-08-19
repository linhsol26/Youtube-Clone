import { DiskSizePipe } from "./disk-size.pipe";

describe("DiskSizePipe", () => {
  it("create an instance", () => {
    const pipe = new DiskSizePipe();
    expect(pipe).toBeTruthy();
  });
});
