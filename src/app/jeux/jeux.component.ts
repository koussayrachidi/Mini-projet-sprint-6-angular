import { Component, OnInit } from '@angular/core';
import { Jeu } from '../model/jeu.model';
import { JeuService } from '../services/jeu.service';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-jeux',
  templateUrl: './jeux.component.html',
})
export class JeuxComponent implements OnInit {

  jeux? : Jeu[];

  constructor(private jeuService : JeuService,public authService: AuthService) {
  //this.jeux=[]
   }

  ngOnInit(): void {
    this.chargerJeux();

  }
  chargerJeux(){
    this.jeuService.listeJeux().subscribe(prods => {
    console.log(prods);
    this.jeux = prods;
    this.jeux.forEach((prod) => {
      this.jeuService
      .loadImage(prod.idJeu)
      .subscribe((img: Image) => {
      prod.imageStr = 'data:' + img.type + ';base64,' + img.image;
      });
      });
      });
      }
  supprimerJeu(p: Jeu){
let conf = confirm("Etes-vous sûr ?");
if (conf)
this.jeuService.supprimerJeu(p.idJeu).subscribe(() => {
console.log("jeu supprimé");
this.chargerJeux();
});
}

}
