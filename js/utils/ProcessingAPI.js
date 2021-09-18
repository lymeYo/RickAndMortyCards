import 'regenerator-runtime/runtime';
import { getEpisode } from 'rickmortyapi';
import { getEpisodes } from 'rickmortyapi';
import { getCharacter } from 'rickmortyapi';
import { getCharacters } from 'rickmortyapi';

const AmountCharacters = 30;

export class ProcessingAPI {
   constructor() { }

   async getCharactersAPI(amountTotalCharacters) {
      
      // let responce = await getCharacters();
      const characters = [];

      if (+amountTotalCharacters?.[0]) {
         for (let id of amountTotalCharacters) {
            let character = await getCharacter(id);
            characters.push(character.data);
         }
      } // добавляю в начало массива основных персонажей
      
      for (let i = 1; i <= AmountCharacters; i++) {
         let id = Math.ceil(Math.random() * 300 + 5);

         while (amountTotalCharacters.includes(id)) {
            id = Math.ceil(Math.random() * 300 + 5);
         }
         
         let character = await getCharacter(id);
         characters.push(character.data);
      }

      console.log(characters);
      

      return characters;
   }
   
   async getEpisodesAPI() {
      let episodes = [];
      for (let counter = 1; counter < 42; counter++) {
         let ep = await getEpisode(counter);
         episodes.push(ep);
      }
      episodes = episodes.map(source => source.data);
      // console.log(episodes);
      
      this.setEpisodeDescription(episodes);
      return episodes;
   }

   setEpisodeDescription(data) {
      let descriptions = [
         'Рик отправляется с Морти в путешествие в другое измерение, чтобы найти семена от Мегадеревьев, в то время как Джерри и Бет спорят о влиянии Рика на их сына. Морти помогает Рику нелегально перевезти Мегасемена из параллельного измерения.',
         'Рик соорудил шлем, делающий собак умнее, который надевают на своего пса Снаффлса. Рик и Морти отправляются в путешествие по снам людей, где встречают Страшного Тэрри.',
         'Джерри собирается отмечать Рождество и приглашает свою семью на праздничный ужин. Пока Джерри со своими родителями и их новым другом Джейкобом отмечают праздник, Рик, уменьшив Морти, отправляет его в тело Рубена. Внутри Морти обнаруживает настоящий анатомический парк, где он знакомится с доктором Ксенон Блумом, охранником Пончо, подростком Энни и Роджером. Система безопасности Рубена отключилась и поэтому все опасные болезни в теле Рубена вышли на свободу.',
         'Зигерионцы помещают Джерри и Рика в симуляцию, чтобы узнать секрет изготовления концентрированной темной материи.',
         'Рик дарит семье коробку с мисиксами — существами, которые появляются, чтобы выполнить одно задание и умереть. Рик и Морти отправляются в фэнтезийный мир в поисках приключений, где встречают великанов.',
         'Рик создает сыворотку, которая должна помочь приворожить Джессику к Морти. Но смешавшись с вирусом гриппа, сыворотка вызывает эпидемию.',
         'У Морти рождается сын от секс-робота, купленного Риком. Саммер и Рик отправляются на планету, где был создан секс-робот.',
         'Рик дарит семье прибор, позволяющий увидеть себя в альтернативной реальности, и улучшает телевизор, который начинает принимать все каналы Вселенной.',
         'Морти должен сделать научный проект для школы, в чём ему помогает его отец Джерри, предлагая построить модель Солнечной системы. Джерри настаивает на том, что Плутон это планета, после чего его и Морти похищают плутонианцы. Саммер устраивается работать в магазин проклятых вещей.',
         'Совет Риков обвиняет Рика в убийстве других альтернативных версий Рика.',
         'Бетти и Джерри уезжают в тематический отпуск, посвященный Титанику». Рик и Саммер устраивают домашнюю вечеринку, в результате которой дом оказывается в ужасном состоянии. Рик замораживает время, чтобы успеть всё исправить до приезда Бетти и Джерри.',
         'Рик, Морти и Саммер размораживают время и возвращают все на круги своя. Но реальность разбивается на два (4, 8 и т. д.) параллельных мира, а Рик, Морти и Саммер оказываются в бесконечном небытие. В привычной реальности в это время Джерри сбивает оленя, а Бетти приходится его экстренно спасать.',
         'Рик учит Морти управлять космическим кораблем. Вместе с Джерри они прилетают на планету с множеством игровых автоматов. Джерри попадает в детский сад для Джерри из всех возможных миров. Морти узнает, что Рик торгует оружием и осуждает его. Морти пытается спасти разумное облако газа, но все не так просто, как кажется…',
         'Рик, Морти и Саммер откликнулись на космический сигнал бедствия, чтобы ограбить корабль. На корабле они встречают Юнити, существо коллективного разума. Позже становится ясно, что Юнити — бывшая девушка Рика. Ученый-алкоголик решает вспомнить былые времена и затусить» с Юнити. Саммер устраивает на планете Юнити межрасовую войну, призывая существ стать собой». Джерри и Бетти в пылу ссоры находят в подвале своего дома инопланетянина. После пламенной речи Саммер, Юнити понимает, что Рик плохо на неё влияет и бросает его, после чего Рик засыпает во время неудачной попытки суицида.',
         'В доме Смитов поселяются инопланетные паразиты — быстро размножающиеся существа, принимающие облик самых разных гуманоидов и животных, которые способны воздействовать на разум, заставляя людей верить, что они были в их жизни всегда. Отчаянно пытающегося исправить ситуацию Рика, который стремится найти способ отличить паразитов от реальных членов и друзей семьи, самого обвиняют в том, что он паразит, и предлагают казнить…',
         'К Земле приближается гигантская голова и телепортирует планету в далёкий космос для участия в музыкальном конкурсе. Выбывшие планеты уничтожаются. Рик и Морти выходят на связь с правительством Америки и пытаются придумать достойную песню, чтобы не потерпеть поражение. В это время директор Вагина принимает головы, наблюдающие за ходом конкурса, за божественные существа и, неправильно интерпретируя их эмоции, основывает новую религию, делая вид, что выполняет их волю.',
         'Рик, Морти и Саммер развлекаются просмотром полнометражного фильма о Яйцелюбах в параллельной вселенной. Собираясь лететь домой, Рик обнаруживает, что в его летающей тарелке не работает генератор энергии. Оказывается, его транспорт питает целая минивселенная, жители которой вырабатывают электричество на специальных тренажёрах. Желая выяснить, в чём дело, Рик берёт с собой Морти и отправляется в минивселенную, оставляя защитную систему летающей тарелки охранять Саммер любой ценой».',
         'Джерри и Бетт опять ссорятся. Устав от их бесконечных скандалов, Рик отвозит их в инопланетный центр психологической помощи семейным парам. При помощи новейших технологий психологи создают живых существ, соответствующих представлениям супругов друг о друге, для большей наглядности. Однако когда дело доходит до Джерри с женой, их существа сбегают, сея панику и хаос. В это время Рик переселяет свой разум в тело своего клона-подростка, чтобы помочь Саммер и Морти убить заведшегося в школе вампира, но так увлекается, что не хочет возвращаться в старое тело…',
         'Джерри подхватывает инопланетный вирус по вине Рика, и его доставляют в инопланетную больницу, где представлены лучшие врачи Галактики. Вылечив Джерри, инопланетяне предлагают ему помочь спасти жизнь политическому деятелю Шримпли Пиблзу, борющемуся за мир. Вместо сердца Пиблзу планируется пересадить пенис Джерри. Между тем Рик, Морти и Саммер коротают время в зале ожидания просмотром телепередач из параллельных вселенных.',
         'Рик и Морти летят в космосе. Какое-то существо вмазывается в лобовое стекло. Они высаживаются на одной планете, чтобы убрать труп на лобовом стекле. Но после заката начинается самое интересное — судная ночь.',
         'Рик с семьей летит на свадьбу Птичьей Личности и Тэмми. Прилетев на планету Сквонч» Рик узнает, что Тэмми не та, за кого себя выдает…',
      ]
      console.log(data);
      
      
      data.forEach((scene, ind) => {
         scene.description = descriptions[ind];
      });
      
   }
}