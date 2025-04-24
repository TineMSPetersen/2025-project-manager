import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import { styles } from "./style";

interface projectProps {
  project_name: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  priority: string;
  paidStatus: boolean;
  paidAmount: number;
  duedate: string;
  images: string[];
  description: string;
  notes: string[];
}

const ProjectDownload = ({
  project_name,
  customer_name,
  customer_email,
  customer_phone,
  priority,
  paidStatus,
  paidAmount,
  duedate,
  images,
  description,
  notes,
}: projectProps) => {
  const projectPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerleft}>
            <Text style={styles.projectName}>{project_name}</Text>
            <Text style={styles.clientName}>{customer_name}</Text>
          </View>
          <View style={styles.headerright}>
            <View style={styles.headerrightlabels}>
              <Text>Priority: {priority}</Text>
              <Text>
                Payment status: {paidStatus === true ? "Paid" : "Unpaid"}{" "}
                {paidStatus === true ? " $" + paidAmount : null}
              </Text>
              <Text>
                Due date:{" "}
                {duedate
                  ? new Date(Number(duedate)).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "No due date"}
              </Text>
            </View>
            <View style={styles.headerrightinfo}>
              <Text>Customer email: {customer_email}</Text>
              <Text>Customer phone: {customer_phone}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.section, styles.images]}>
          {images ? images.map((item) => <Image src={item} />) : null}
        </View>
        <View style={styles.section}>
          <Text>{description}</Text>
        </View>
        <View>
          <Text style={styles.notes}>Important Notes</Text>
          {notes ? notes.map((item) => <Text>- {item}</Text>) : "No notes"}
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      <PDFDownloadLink document={projectPDF()} fileName={project_name + '.pdf'}>
        <li className="flex gap-3">
          <p className="text-lg">Download PDF</p>
        </li>
      </PDFDownloadLink>
    </div>
  );
};

export default ProjectDownload;
