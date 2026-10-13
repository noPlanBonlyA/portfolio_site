import { osCopy } from "@/content/os";
import { profile } from "@/content/profile";

import styles from "./desktop.module.css";

export function Wallpaper() {
  return (
    <div aria-hidden="true">
      <div className={styles.wp}>
        <div className={styles.wpOutline}>{profile.firstName}</div>
        <div className={styles.wpSolid}>
          {profile.lastName}
          <span className={styles.wpCaret} />
        </div>
      </div>
      <div className={styles.wpHint}>{osCopy.wallpaperHint}</div>
      <div className={styles.wpCoords}>{profile.coords}</div>
    </div>
  );
}
