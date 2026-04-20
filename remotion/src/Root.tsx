import { Composition } from "remotion";
import { GovernorsAddress } from "./GovernorsAddress";
import stats from "../../src/data/stats.json";

const FPS = 30;
const DURATION_SECONDS = 8;

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="GovernorsAddress"
        component={GovernorsAddress}
        durationInFrames={DURATION_SECONDS * FPS}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{
          quarter: "Q2 · MMXXVI",
          auditor: stats.auditor,
          lastAudit: stats.lastAudit,
          circulating: stats.circulating,
          canReserve: stats.canReserve,
          purity: stats.purity,
        }}
      />
    </>
  );
};
