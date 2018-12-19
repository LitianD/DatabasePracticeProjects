import java.io.*;
import java.util.*;

public class MMU {
    private List<Page> pages;
    private List<Frame> frames;
    private ArrayList<Integer> pagesArray;
    private File file;

    final int FRAME_NUMBER = 16;
    final int PER_AREA = 4096;

    public MMU(String filePath) {
        this.file = new File(filePath);
        try {
            FileInputStream fileInputStream = new FileInputStream(file);
            BufferedInputStream in = new BufferedInputStream(fileInputStream);
            int pageNum = (int) Math.ceil((double) in.available() / (double) 4);
            pages = new ArrayList<>();
            for (int i = 0; i < pageNum; i++)
                pages.add(new Page(i + 1, false, i * 4096));
            frames = new ArrayList<>();
            for (int i = 0; i < FRAME_NUMBER; i++)
                frames.add(new Frame());
            pagesArray = new ArrayList<Integer>();
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String getPage(int pageNum) throws IOException {
        if (pagesArray.size() < 16) {
            if (!pagesArray.contains(pageNum)) {
                Page page = pages.get(pageNum - 1);
                Frame frame = frames.get(pagesArray.size());
                frame.setContent(getContent(pageNum));
                page.setStatus(true);
                pages.set(pageNum - 1, page);
                frames.set(pagesArray.size(), frame);
                pagesArray.add(pageNum);
            } 
			else {
                operationIfExists(pageNum, false);
            }
        } 
		else {
            if (!pagesArray.contains(pageNum))
                LRU(pageNum);
            else
                operationIfExists(pageNum, true);
        }
        Frame result_frame = frames.get(pagesArray.indexOf(pageNum));
        String result = new String(result_frame.getContent());
        return result;
    }

    private byte[] getContent(int pageNum) throws IOException {
        FileInputStream fileInputStream = new FileInputStream(this.file);
        fileInputStream.skip(pages.get(pageNum - 1).getPosition());
        BufferedInputStream in = new BufferedInputStream(fileInputStream);
        ByteArrayOutputStream out = new ByteArrayOutputStream(1024);


        byte[] temp = new byte[1024];
        int size = 0;
        int counter = 0;
        while ((size = in.read(temp)) != -1 && counter < 4) {
            counter += 1;
            out.write(temp, 0, size);
        }
        in.close();

        byte[] content = out.toByteArray();
        return content;
    }


    private void LRU(int pageNum) throws IOException {
        Page page = pages.get(pageNum - 1);
        Page page_ori = pages.get(pagesArray.get(0) - 1);
        pagesArray.remove(0);
        pagesArray.add(pageNum);
        frames.remove(0);
        Frame frame = new Frame();
        frame.setContent(getContent(pageNum));
        frames.add(frame);
        page.setStatus(true);
        page_ori.setStatus(false);
        pages.set(pageNum - 1, page);
        pages.set(page_ori.getPageNum(), page_ori);
    }

    private void operationIfExists(int pageNum, boolean ifFull) {
        int index = pagesArray.indexOf(pageNum);
        Page page = pages.get(pageNum - 1);
        Frame frame = frames.get(index);
        frames.remove(frame);
        pagesArray.remove(index);
        pagesArray.add(pageNum);
        if (ifFull)
            frames.add(frame);
        else {
            frames.set(frames.size() - 1, frame);
            frames.add(new Frame());
            page.setStatus(true);
            pages.set(pageNum - 1, page);
        }

    }
}
