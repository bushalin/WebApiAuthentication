import { Component, OnInit } from "@angular/core";
import { UserService } from "src/services/user.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NgxSpinnerService } from 'ngx-spinner';
import { BroadcastMessageServiceService } from 'src/services/broadcast-message-service.service';

@Component({
  selector: "app-broadcast-message-show",
  templateUrl: "./broadcast-message-show.component.html",
  styleUrls: ["./broadcast-message-show.component.css"]
})
export class BroadcastMessageShowComponent implements OnInit {
  text=       "現場対応お疲れ様です。繰り越し工事を除いて完成に向け奮闘中です. 事故には十分気を付けてよろしくです。 県協会から外国人雇用助成金を受給した。上限２０万で１８，５万の受給ですが、これからの流れにおいてこうした助成金は様々な意味合いにおいて重要な対応といえます。またＩＴ人材採用においても補助金対象項目もあり、支援室がこの対応を行っています。更なる飛躍を目指していきながら様々な取り組みにも対処していきましょう。関係者においては情報収集や変わりゆく行政の取り組みを注視しながら極力漏れが無いよう対応よろしくです。 今回盛武組独自の維持作業車を購入するに至った。高速道緊急時対応や、パトロール等に活用が期待できる。災害時での応急業務等にも有効活用が望まれ国や県との連携、建設サービスとの協力にも期待が持てるものと考える。専務の指示のもとルールを再度徹底し、緊急時対応をよろしくです。 ＦＵＫＵＳＩＭＡ５０の映画が放映されている。東日本大震災の津波で大きな被害を出した福島第一原子力発電所の社員たちの葛藤や決死とも言われた数日間の現実に沿って作られた映画である。１号機、３号機の水素爆発そして２号機の炉心爆発（水蒸気爆発）を覚悟し奇跡の圧力低下に導いた吉田所長や関係者の凄まじい戦いの物語である。更に最後に今回盛武組が携わった現場から見る第２原発までの沿岸写真も写しだされた。この映画は我々も復興の一人として携わった見とどけ人でもある。時間を見つけみてもらいたいと思います。きっと何かを感じることでしょう。よろしくです。";
  counter = ['現場対応お疲れ様です。繰り越し工事を除いて完成に向け奮闘中です. 事故には十分気を付けてよろしくです。 県協会から外国人雇用助成金を受給した。上限２０万で１８，５万の受給ですが、これからの流れにおいてこうした助成金は様々な意味合いにおいて重要な対応といえます。またＩＴ人材採用においても補助金対象項目もあり、支援室がこの対応を行っています。更なる飛躍を目指していきながら様々な取り組みにも対処していきましょう。関係者においては情報収集や変わりゆく行政の取り組みを注視しながら極力漏れが無いよう対応よろしくです。 今回盛武組独自の維持作業車を購入するに至った。高速道緊急時対応や、パトロール等に活用が期待できる。災害時での応急業務等にも有効活用が望まれ国や県との連携、建設サービスとの協力にも期待が持てるものと考える。専務の指示のもとルールを再度徹底し、緊急時対応をよろしくです。 ＦＵＫＵＳＩＭＡ５０の映画が放映されている。東日本大震災の津波で大きな被害を出した福島第一原子力発電所の社員たちの葛藤や決死とも言われた数日間の現実に沿って作られた映画である。１号機、３号機の水素爆発そして２号機の炉心爆発（水蒸気爆発）を覚悟し奇跡の圧力低下に導いた吉田所長や関係者の凄まじい戦いの物語である。更に最後に今回盛武組が携わった現場から見る第２原発までの沿岸写真も写しだされた。この映画は我々も復興の一人として携わった見とどけ人でもある。時間を見つけみてもらいたいと思います。きっと何かを感じることでしょう。よろしくです。',
  'asdsad','asdds'];

  messageList = [];

  pageNumber: number = 1;
  constructor(
    private userService: UserService,
    private broadcastService: BroadcastMessageServiceService,
    private translate: TranslateService,
    private route: Router,
    private SpinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {
    if (this.userService.roleMatch(["Shacho"])) {
      //for redirection in the user role "show message"
      //this.route.navigate(["/report/show"]);
    }
    this.getRecentBroadcastMessage();
  }

  getRecentBroadcastMessage() {
    //before fetching data, spinner effect shows
    this.SpinnerService.show();
    this.broadcastService.getRecentBroadcastMessage().subscribe(data => {
      this.messageList = data;
      //after fetching data, spinner will hide
      this.SpinnerService.hide();
    })
  }
}
