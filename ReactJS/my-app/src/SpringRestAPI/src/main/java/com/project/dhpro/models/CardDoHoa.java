package com.project.dhpro.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "carddohoa")
public class CardDoHoa {
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "tencarddohoa")
    private String tenCardDoHoa;

    @Column(name = "bonhocard", nullable = true)
    private int boNhoCard;

    @Column(name = "thietkecard")
    private String thietKeCard;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTenCardDoHoa() {
        return tenCardDoHoa;
    }

    public void setTenCardDoHoa(String tenCardDoHoa) {
        this.tenCardDoHoa = tenCardDoHoa;
    }

    public int getBoNhoCard() {
        return boNhoCard;
    }

    public void setBoNhoCard(int boNhoCard) {
        this.boNhoCard = boNhoCard;
    }

    public String getThietKeCard() {
        return thietKeCard;
    }

    public void setThietKeCard(String thietKeCard) {
        this.thietKeCard = thietKeCard;
    }
}
