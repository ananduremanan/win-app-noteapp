"use client";
import { Card, makeStyles, Button } from "@fluentui/react-components";

const useStyles = makeStyles({
  card: {
    // width: "480px",
    // maxWidth: "100%",
    height: "fit-content",
    backgroundColor: "#fdfdfd",
    color: "#000",
    marginLeft: "20px",
    marginBottom: "1rem",
  },
  fab: {
    position: "absolute",
    bottom: "1rem",
    right: "1rem",
  },
});

export default function Home() {
  const styles = useStyles();

  return (
    <main className="children-wrapper px-8 flex-col">
      <Card className={styles.card}>
        <h2>This is The Title Of The Note</h2>
        <p>
          This Note acan be anything about in the world, It maybe about you, It
          may be about me, also It may be about the starting of all the
          beautiful moments we'd came through.
        </p>
      </Card>
      <Card className={styles.card}>
        <h2>This is The Title Of The Note</h2>
        <p>
          This Note acan be anything about in the world, It maybe about you, It
          may be about me, also It may be about the starting of all the
          beautiful moments we'd came through.
        </p>
      </Card>
      <button className="absolute bottom-6 right-6 shadow-xl p-4">
        Example
      </button>
    </main>
  );
}
