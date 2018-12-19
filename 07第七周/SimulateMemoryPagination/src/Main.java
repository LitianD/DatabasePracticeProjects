import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;

public class Main {

    public static void main(String[] args) throws IOException {
        MMU mmu = new MMU("src/The Little Prince.txt");
        for (int i = 1; i <= 16; i++)
            mmu.getPage(i);
        mmu.getPage(1);
        mmu.getPage(3);
        mmu.getPage(14);
        int i = 1;
    }
}
