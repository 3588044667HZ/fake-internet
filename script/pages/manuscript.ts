// 英文手稿线:洋人关员日记残页改编的论坛求助帖。
// 叙事设计:洋人用英文记下锦州祭祀场景,土话音译词(kao/t'ai sui/lai yü pi 等)
// 对剧情中的外人不可解,中文母语者却可直接解码——解码乐趣属于玩家。
// 关键联动帖(音译解码 = 老档案)被删,看过幽灵页后揭示。
// 关联词(白油/长生道/克苏鲁/来于比等)计入「黑石头」计数,见 script/rules.ts。
import type { PageData } from '@fw/data/types'

export const pages: PageData[] = [
  {
    id: 'jz-thread-manuscript',
    url: 'http://forum.oldnet.local/t/1872',
    site: '旧网论坛',
    kind: 'thread',
    title: '【求助】外祖父留下的英文日记残页,记的好像是场祭祀',
    author: '雾都孤儿',
    date: '2005-07-18',
    searchable: true,
    keywords: ['手稿', '日记', '英文', '克苏鲁', '拉莱耶', '来于比', '黑太岁', '太岁', '膏', '祭祀', '猪油', '白油', '长生道'],
    posts: [
      {
        author: '雾都孤儿',
        date: '2005-07-18 23:14',
        body: '外祖父解放前在锦州海关做文书,遗物里有一册旧英文日记,作者是个洋人关员(名字洇得只剩个"W.")。手稿大多已经烂掉了,能看清的几段我抄在下面,一段一层楼。里面还夹着一页从别的英文书里抄来的段落,笔迹不同,也一并贴出来。请懂英文的朋友帮看看:这写的是什么?日记里那些怪词,是不是锦州的土话?',
      },
      {
        author: '雾都孤儿',
        date: '2005-07-18 23:20',
        body: '以下是第一段:"Yesterday the coolie who tends our garden did not come. They found him by the well, and the well is now sealed with a stone lid no four men could lift. My clerk would not tell me what they saw. He said only, twice, as if the words burned him: hua kao, san t\'ien. To become grease. Three days. Always three days."',
      },
      {
        author: '雾都孤儿',
        date: '2005-07-18 23:26',
        body: '"The village keeps a black stone — hei shih t\'ou, they call it — smooth and round as a hen\'s egg, and before it a wooden tablet, and before the tablet a bowl of white grease. The grease they call kao. It is not eaten, not even in famine years. I have watched: the bowl is filled at the dark of the moon, and by the full moon it is lower, though no hand touches it. They say the offering is eaten."',
      },
      {
        author: '雾都孤儿',
        date: '2005-07-18 23:33',
        body: '"Tonight I followed them beyond the river, where the old shrine stands behind the hill. Forty or more, single file, no lamps, not one word spoken. The eldest carried the stone; the women carried the grease. Before the shrine they knelt and sang, very low, the same two sounds over and over: kao... kao... Then the words of the old chant — my predecessor wrote them down for me, and I write them again: t\'ai sui ch\'ung jih, t\'ai sui ch\'ung jih, fu hsing... The star T\'ai Sui against the sun, and it wakes. The thing under the well-lid answered. I saw it once only, when the moon broke clear. It was black, and bloated, and it shone like fresh oil. It had no legs. It moved as the grease itself would move, out of the well and over the stones, and the people — they did not run. They held out the bowls."',
      },
      {
        author: '雾都孤儿',
        date: '2005-07-18 23:41',
        body: '"They call the sect ch\'ang shêng tao — the Way of Long Life. They say the first man who carried the stone was the god\'s own servant, or the god itself walking in a man\'s shape. They say to eat of the T\'ai Sui is to live forever, and at the great gatherings they do eat of it — a black, quivering thing, cut from something greater, which never dies. I asked where the followers of the last gathering were. The headman looked at the ground and said: the bowls came back full. The oil, he said, was still warm."',
      },
      {
        author: '雾都孤儿',
        date: '2005-07-18 23:48',
        body: '夹的那一页,笔迹不同,像是从什么书里抄的:"Ph\'nglui mglw\'nafh Cthulhu R\'lyeh wgah\'nagl fhtagn." — In his house at R\'lyeh dead Cthulhu waits dreaming. "That is not dead which can eternal lie, and with strange aeons even death may die." 页脚有一行铅笔字,是日记主人的前任写的:"Not Yu Shên. Listen to the chant again: Lai Yü Pi. R\'lyeh. It is the same name."',
      },
      {
        author: '雾都孤儿',
        date: '2005-07-18 23:55',
        body: '最后一段:"They whisper of a sickness — pai yu, the white grease, they call it, and they will not say the word after dark. The sick fatten. Then the skin, they say, opens, and the man runs out. I do not ask what remains in the bed. I am told the god came here lai yü pi — from beyond — before men, and sleeps beneath this ground, in a great pool, and the rivers and the wells are all its fingers." 就这些了。翻译出来了吗?',
      },
      {
        author: '克苏鲁爱好者',
        date: '2005-07-20 01:03',
        body: '楼主,英文我来。大意:一个洋人关员在锦州记的日记。他夜里跟踪村民过河,到了山后的旧庙,看见一场祭祀:黑石头、木牌子、一碗白色油脂,村民跪着唱两个音,一遍一遍,然后唱祷词,他记成"太岁冲日,复醒"——然后井盖底下有东西应了。他只看清一眼:黑色,臃肿,像新鲜的油一样发亮,没有腿。还提到一个叫"长生道"的教派,信众吃"太岁"求长生,最后一次集会之后人都不见了,碗满着回来,油还是温的。夹的那页书是克苏鲁神话:祷文"在拉莱耶的宅邸中,死去的克苏鲁等待入梦",还有那句"那永恒长眠的并非亡者,在奇妙的万古之中,连死亡本身也会消亡"。重点是那行铅笔字:他的前任也听出来了,不是"油神",是 R\'lyeh——来于比!我鸡皮疙瘩都起来了。日记里其余的音译词(kao、pai yu、hua kao、hei shih t\'ou)应该都是锦州土话,我不是本地人,读不出来。盼本地网友指教。',
      },
      {
        author: '老档案',
        date: '2005-07-22 00:47',
        deleted: true,
        deletedRevealFlag: 'jz_ghost_seen',
        body: 'Kao 是膏,猪油。T\'ai Sui 是太岁,老人们叫它黑太岁。Hua kao 是化膏,人化成油。Pai yu 是拜由——这病在当地方言里就是"白油"。Ch\'ang Shêng Tao 是长生道。这个洋人夜里看见的,就是给黑太岁上供:黑石头、木牌子、猪油,一样不差。他写"太岁冲日,复醒",就是老话"每当太岁冲日,复醒"。断供的人化膏,和《锦有黑石》里那句"如无故断供,则供主化膏,三天尽矣"对上了。别往下查了。星星的位置,快对了。',
      },
      {
        author: '匿名用户',
        date: '2005-07-25 03:33',
        body: '别翻译了。',
      },
    ],
  },
]
