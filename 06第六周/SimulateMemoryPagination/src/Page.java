public class Page {
    private int pageNum;
    private boolean ifLoad;
    private long position;

    public Page(int pageNum, boolean ifLoad, long position) {
        this.pageNum = pageNum;
        this.ifLoad = ifLoad;
        this.position = position;
    }

    public int getPageNum() {
        return pageNum;
    }

    public long getPosition() {
        return position;
    }


    public void setStatus(boolean ifLoad) {
        this.ifLoad = ifLoad;

    }
}
