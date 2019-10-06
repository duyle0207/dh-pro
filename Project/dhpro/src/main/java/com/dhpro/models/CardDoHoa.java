package com.dhpro.models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "carddohoa")
public class CardDoHoa {
    @Id
    @Column(name = "id")
    private int Id;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getTenCardDoHoa() {
        return TenCardDoHoa;
    }

    public void setTenCardDoHoa(String tenCardDoHoa) {
        TenCardDoHoa = tenCardDoHoa;
    }

    public int getBoNhoCard() {
        return BoNhoCard;
    }

    public void setBoNhoCard(int boNhoCard) {
        BoNhoCard = boNhoCard;
    }

    public String getThietKeCard() {
        return ThietKeCard;
    }

    public void setThietKeCard(String thietKeCard) {
        ThietKeCard = thietKeCard;
    }

    @Column(name = "tencarddohoa")
    private String TenCardDoHoa;

    @Column(name="bonhocard")
    private int BoNhoCard;

    @Column(name="thietkecard")
    private String ThietKeCard;
}
