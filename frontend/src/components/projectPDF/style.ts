import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: '#000000',
    fontSize: 10,
    padding: "30px 50px"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between"
  },
  headerleft: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  projectName: {
    fontSize: 16,
  },
  clientName: {
    fontSize: 12,
  },
  headerright: {
    fontSize: 10,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  headerrightlabels: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  headerrightinfo: {
    textAlign: "right"
  },
  section: {
    margin: "10px 0",
    padding: "10px 0"

  },
  notes: {
    fontSize: 16,
  },
  images: {
    display: "flex",
    flexDirection: "row"
  },
  image:{
  },
  total: {
    fontSize: 20
  },
  total_amount: {
    fontSize: 30,
    fontWeight: 700
  }
});