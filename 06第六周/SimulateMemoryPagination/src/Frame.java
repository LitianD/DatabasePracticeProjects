public class Frame {
    private byte[] content;

    public Frame() {
        this.content = new byte[4096];
    }

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }
}
