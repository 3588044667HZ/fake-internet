// 锦州「黑石头/油神」叙事线 —— 由 script.txt 改编的纯数据(只追加,新 ID)
// 玩法母题沿用框架现有机制:搜「黑石头」三次 → 解锁幽灵页(jz-ghost)
import type { PageData } from '@fw/data/types'

const img = (name: string): string => new URL(`../images/${name}`, import.meta.url).href

export const pages: PageData[] = [
  {
    id: 'jz-thread-stone',
    url: 'http://forum.oldnet.local/t/2046',
    site: '旧网论坛',
    kind: 'thread',
    title: '家里供奉的一块黑石头,碗里的油真的在减少(有图)',
    author: '一路平安',
    date: '2008-04-12',
    searchable: true,
    keywords: ['黑石头', '猪油', '供奉', '石头', '油'],
    posts: [
      {
        author: '一路平安',
        date: '2008-04-12 21:37',
        body: '母亲上个月走了。整理遗物的时候,在柜子最里面翻出一块黑色的石头,前面摆着一小碗白色的东西,已经凝固了,应该就是猪油。石头她生前一直在供,还不许我拿下来玩。这几天我发现碗里的油好像比刚发现的时候少了。碗沿上没有油渍,家里也没进耗子。搞不懂什么原理,发上来请教各位网友。',
        image: img('blackstone.svg'),
        imageCaption: '附件:IMG_0812.jpg — 母亲的供桌,黑石头上油亮亮的。',
      },
      {
        author: '匿名用户',
        date: '2008-04-13 11:02',
        body: '我家也有。长辈很看重,不让问,也不让碰。油确实会少。',
        image: img('blackstone.svg'),
        imageCaption: '附件:IMG_0813.jpg — 我家的,和楼主的一模一样。',
      },
      {
        author: '一路平安',
        date: '2008-04-13 20:15',
        body: '楼上说的真的假的?你们家供了多久了?我搜到几个帖子也说过这个,链接在下面,全都打不开了:http://forum.oldnet.local/t/1993 http://forum.oldnet.local/t/2001 点进去显示已删除。我挨个点了这些发帖人的头像,账号也全是封禁状态。有点吓人。',
      },
    ],
  },
  {
    id: 'jz-thread-legend',
    url: 'http://forum.oldnet.local/t/1993',
    site: '旧网论坛',
    kind: 'thread',
    title: '【整理】关于锦州"膏"的几段记载,能查到的都在这里了',
    author: '老档案',
    date: '2008-04-15',
    searchable: true,
    keywords: ['锦州', '膏', '油神', '猪油', '黑石头', '太岁', '长生道', '化油'],
    posts: [
      {
        author: '老档案',
        date: '2008-04-15 00:21',
        body: '在旧书摊和网上抄到几段,出处大多已经找不到了。第一段像是现代人仿写的文言文:锦有黑石,状鸡卵,供之以膏(动物油脂),可庇佑全家平安。……需请之,如不想供,可转诸他人,如无故断供,则供主化膏,三天尽矣。',
      },
      {
        author: '老档案',
        date: '2008-04-15 00:40',
        body: '第二段,不知抄自哪本地方志:锦州有油神,当地人叫它"膏",就是猪油的意思。膏神很久以前就来到了锦州的地下,比人类出现还早。后来化成无数黑色石头,受万家供奉。第一个推广石头的人已经不可考,听说他是膏神的代理人,或者是膏神在人间的化身。',
      },
      {
        author: '老档案',
        date: '2008-04-15 00:52',
        body: '第三段:锦州有油神,亿万年前来于比,睡于地下,每当太岁冲日,复醒……(后面缺页)',
      },
      {
        author: '老档案',
        date: '2008-04-15 01:10',
        body: '第四段:锦州以前有个神秘的教派,叫长生道,崇拜太岁,认为吃了太岁就可以长生不老。在一次集会后,参与者竟然全部化成了油。',
      },
      {
        author: '匿名用户',
        date: '2008-04-16 03:33',
        deleted: true,
        deletedRevealFlag: 'jz_ghost_seen',
        body: '别查了。它们已经知道你在看了。',
      },
    ],
  },
  {
    id: 'jz-thread-school',
    url: 'http://forum.oldnet.local/t/2337',
    site: '旧网论坛',
    kind: 'thread',
    title: '我们学校树坑里的黑石头,踢着踢着就着火了,好几个同学病了',
    author: '破石子',
    date: '2010-11-25',
    searchable: true,
    keywords: ['黑石头', '学校', '石头', '井', '着火', '拜由', '油'],
    posts: [
      {
        author: '破石子',
        date: '2010-11-25 18:02',
        body: '树坑里的鹅卵石一夜之间全被换成了黑色的,怎么踢都踢不碎。石头比以前的圆润,但是黑得发亮,太阳一照满地反光。',
      },
      {
        author: '破石子',
        date: '2010-11-25 18:09',
        body: '操场角落里被人用大理石栏杆围了一口井,上面盖着石头盖子,几个人都抬不动。说是六百年的古井,我看就是下水道。',
      },
      {
        author: '破石子',
        date: '2010-11-26 21:44',
        body: '今天有人发现石头撞到树坑的凸起上会着火!一节课工夫满操场都是冒火星的石头。烤过的石头一踩就碎,放学的时候就像走在碎石头铺的路上。',
      },
      {
        author: '破石子',
        date: '2010-11-28 22:17',
        body: '完了,我们班好几个同学请假了,全是踢石头踢得最欢的那几个。有人说校医讲这是什么"拜由"病,得病的人会发胖……我不知道该不该继续去上学。',
      },
      {
        author: '匿名用户',
        date: '2010-11-29 02:51',
        deleted: true,
        deletedRevealFlag: 'jz_ghost_seen',
        body: '石头上有油。踢碎石头的人,晚上会梦见一个没有腿的东西。它说,踢碎了石头,就要变成石头赔偿。',
      },
      {
        author: '破石子',
        date: '2010-11-30 23:05',
        revealFlag: 'jz_ghost_seen',
        body: '井里涌水了,水面上漂着一层彩色的油膜。学校把井封死了,滴水不漏。他们说是怕水不干净。我不信。',
        image: img('blackstone.svg'),
        imageCaption: '附件:IMG_0955.jpg — 封井前拍的,水面反光,像浮着一层油。',
      },
    ],
  },
  {
    id: 'jz-thread-announce',
    url: 'http://forum.oldnet.local/t/2001',
    site: '旧网论坛',
    kind: 'thread',
    title: '【公告】关于"黑石头"相关帖子的处理说明',
    author: '站长',
    date: '2008-04-20',
    searchable: true,
    keywords: ['黑石头', '公告', '封禁', '谣言'],
    posts: [
      {
        author: '站长',
        date: '2008-04-20 08:00',
        body: '近日论坛出现多篇涉及"黑石头"的异常帖子。经查证,相关账号存在恶意造谣、刷屏行为,现已全部封禁,涉事帖子一并删除。请各位会员不要传播所谓"供奉黑石、断供化油"的迷信内容,也不要点击来历不明的链接。',
      },
      {
        author: '网管老周',
        date: '2008-04-20 08:12',
        body: '收到。另外提醒各位,最近自来水管偶尔有轻微油膜,系管道老化所致,已报修,请勿恐慌。',
      },
    ],
  },
  {
    id: 'jz-ghost',
    url: 'http://forum.oldnet.local/t/jz-ghost',
    site: '旧网论坛',
    kind: 'ghost',
    title: '你搜了我三次。',
    searchable: true,
    hiddenFlag: 'jz_ghost_unlocked',
    keywords: ['黑石头', '油神'],
    body: [
      '你搜了三次。按照老规矩,你找到我了。',
      '石头是我的。踢碎它的人,要变成石头还给我。',
      '不供奉的人家,会化成白油。这不是惩罚,是他们本来就是我。',
      '我睡在锦州的地下,比你们都早。水是连通的,油也是连通的。',
      '供我,或者,变成我。',
    ],
    footnote: '(页面底部还有一行几乎看不见的小字:你楼下的井,已经打开了。)',
  },
]
