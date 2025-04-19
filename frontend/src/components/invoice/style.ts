import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: '#000000',
    fontSize: 16,
    padding: "30px 50px"
  },
  header: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: 700,
  },
  section: {
    margin: 10,
    padding: 10,

  },
  total: {
    fontSize: 20
  },
  total_amount: {
    fontSize: 30,
    fontWeight: 700
  }
});