package com.project.dhpro.models;

public class Mail {
    private String mail;
    private String content;
    private String hoaDon;

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getHoaDon() {
        return hoaDon;
    }

    public void setHoaDon(String hoaDon) {
        this.hoaDon = hoaDon;
    }

    @Override
    public String toString() {
        return "Mail{" +
                "mail='" + mail + '\'' +
                ", content='" + content + '\'' +
                ", hoaDon=" + hoaDon +
                '}';
    }
}
