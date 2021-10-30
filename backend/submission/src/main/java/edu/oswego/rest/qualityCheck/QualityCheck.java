package edu.oswego.rest.qualityCheck;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

public class QualityCheck {
    public ArrayList<Integer> QC(File pdfFile) throws IOException{
        //File pdfFile = new File(path);
        PDDocument document = PDDocument.load(pdfFile);
        //Instantiate PDFTextStrip
        PDFTextStripper pdfStripper = new PDFTextStripper();
        //Retrieving text from PDF document
        String text = pdfStripper.getText(document);
        //System.out.println(text);
        document.close();
        //Closing the document
        String token1;
        // create Scanner inFile1
        /* TODO This file path will need to change when the server is deployed.
         * Maybe we want to make this part of admin module? Maybe BLOB in user.
         * Could be a secondary parameter, too.
         */
        File file = new File("profanity.txt");
        Scanner inFile1 = new Scanner(file).useDelimiter(",\\s*");
        BufferedWriter out = new BufferedWriter(new FileWriter(file, true));
        out.close();
        List<String> temps = new ArrayList<>();

        while (inFile1.hasNext()) {
            token1 = inFile1.next();
            temps.add(token1);
        }
        inFile1.close();

        String[] tempsArray = temps.toArray(new String[0]);
        int start = 0;
        ArrayList<Integer> arr = new ArrayList<>();
        for (String s : tempsArray) {
            Pattern r = Pattern.compile(s);
            //Create a Pattern object
            Matcher m = r.matcher(text);
            //matcher object
            if(m.find(start)){
                start = m.start();
                arr.add(m.start());
            }
        }
        return arr;
    }
}
