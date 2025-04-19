import {
  Page,
  Text,
  View,
  Document,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";
import { styles } from "./style";
import { useEffect, useState } from "react";

interface InvoiceProps {
  commissionType: string;
  typePrice: number;
  characterAmount: number;
  addCharaterPrice: number;
  feePrices: number[];
}

const Invoice2 = ({
  commissionType,
  typePrice,
  characterAmount,
  addCharaterPrice,
  feePrices,
}: InvoiceProps) => {
  const [quote, setQuote] = useState(0);

  useEffect(() => {
    const calculateFees = () => {
      return feePrices.reduce((acc, val) => acc + val, 0);
    };

    const total =
      typePrice + (characterAmount - 1) * addCharaterPrice + calculateFees();
    setQuote(total);
  }, [typePrice, characterAmount, addCharaterPrice, feePrices]);

  const InvoicePDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Your Quote</Text>
        </View>
        <View style={styles.section}>
          <Text>Type: {commissionType}</Text>
          <Text>Character Amount: {characterAmount}</Text>
          <Text>
            Price before fees:{" "}
            {typePrice + (characterAmount - 1) * addCharaterPrice}
          </Text>
          <Text>Fees: {feePrices.reduce((acc, val) => acc + val, 0)}</Text>
        </View>
        <View style={[styles.section, styles.total]}>
          <Text>Subtotal: {quote}</Text>
          <Text>Discounts: None</Text>
          <Text style={styles.total_amount}>Total: ${quote}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="flex justify-center">
      <PDFDownloadLink document={InvoicePDF()} fileName="quote.pdf">
        <button className="bg-linear-to-b from-[#FF0036] to-[#321234] p-2 rounded-md outline-2 outline-[#FF0036] w-80">
          Download PDF
        </button>
      </PDFDownloadLink>
    </div>
  );
};

export default Invoice2;
