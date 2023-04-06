const http = require('http');
var html = require('fs').readFileSync('index.html');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
}).listen(8080);

const {
  Client,
  Intents,
  Discord,
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  Permissions,
  MessageSelectMenu,
  TextInputComponent,
  Modal
} = require('discord.js')
  
//intentsのoption
const option = {
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_VOICE_STATES,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
}
//client
const client = new Client(option)
const config = require('./config.json')
const {
    uuid
}   = require('./uuid.js')
const fs = require('fs') 
client.on('ready',async () => {   
//const { register } = require('./register.js') 
console.log("起動成功！やったぁ！")
//register(client)
client.user.setActivity({
    name: `サーバー移行メンテナンス中です。開始予定は**4/7 22:30**です。`
   })
    const data = [
       {
        name: "re",
        description: "リソース用のmanifest.jsonを作成します。",
        options: [
          {
            type:"STRING",
            name: "name",
            description:"manifest.json内部の名前を指定できます。",
            required: false
          } 
                 ],
      }, 
      {
          name: "be",
          description: "ビヘイビア（データ）用のmanifest.jsonを作成します。",
      },
      {
          name : "help",
          description: "ヘルプを表示します。"
      },
      {
          name : "uuid",
          description: "UUIDを生成します。"
      },
      {
          name : "function",
          description: "functionを作成します。",
          options: [{
            type:"STRING",
            name: "commands",
            description:"コマンドをここに書いてください。",
            required: true
        }],
      }
    ]
  // await client.application.commands.set(data);
 }) 
/*
client.on('messageCreate',message => {
if(message.content === "mc!help" || message.content === "mc!be" || message.content === "mc!re" || message.content === "mc!uuid" || message.content === "mc!function"){
message.channel.send('このボットはスラッシュコマンドのみのサポートとなっています。スラッシュコマンドが無かったら、ここからもう一度招待しなおしてみてください。\nhttps://discord.com/api/oauth2/authorize?client_id=872373181481111572&permissions=8&scope=bot%20applications.commands')}
})
 client.on('interactionCreate', async interaction => {
 if(interaction.commandName === "help"){
      const embed = new MessageEmbed()
      .setTitle('まいんくらふとあどおんさぽーと！')
      .addField('/be','ビヘイビア(data)形式のmanifest.jsonを作成します \n┗`format_version : 2`\n ┗`/be (テキストインプットボックス)`')
      .addField('/re','リソース(resource)形式のmanifest.jsonを作成します \n `format_version : 1`\n `/re <title(任意)>`')
      .addField('/uuid','uuidを10個生成します \n `/uuid`')
      .addField('/function','<Beta> .mcfunctionを作成します。 \n `/function <command>`')
      .addField('サポートが必要ですか？','[サポートサーバーに来てみてください。](https://discord.gg/nWGUdJZdzY)')
      interaction.reply({embeds:[embed]})
  }



  if(interaction.commandName === "be"){
    const modal = new Modal().setCustomId('be').setTitle('behavior形式 / Manifest.json作成ツール')
    const input_name = new TextInputComponent().setCustomId('input_name_be').setLabel('パックの名前は何にしますか？').setRequired(false).setStyle('SHORT')
    const input_desc = new TextInputComponent().setCustomId('input_desc_be').setLabel('パックの説明はなんですか？').setStyle('SHORT')
    const input_min_engines = new TextInputComponent().setCustomId('input_min_engines').setLabel('パックの最小エンジンバージョンは何にしますか？').setValue('1,14,0').setStyle('SHORT')
    
    const t1 = new MessageActionRow().addComponents(input_name)
    const t2 = new MessageActionRow().addComponents(input_desc)
    const t3 = new MessageActionRow().addComponents(input_min_engines)

    modal.addComponents(t1,t2,t3)

    await interaction.showModal(modal)
  
  }
  if(interaction.customId === "be"){
    let opa = interaction.fields.getTextInputValue('input_name_be')
    let opb = interaction.fields.getTextInputValue('input_desc_be')
    let opc = interaction.fields.getTextInputValue('input_min_engines')

    if(!opa) opa = "未設定のタイトルアドオン"
    if(!opb) opb = "未設定の説明"
    if(!opc) opc = " 1, 14, 0 "
  fs.writeFileSync('manifest.json',`
    {
     "format_version": 2,
     "header": {
         "description": "${opb}",
         "name": "${opa}",
         "uuid": "${uuid()}",
         "version": [ 0, 0, 1 ],
         "min_engine_version": [${opc}]
     },
     "modules": [
         {
             "description": "意味がない説明",
             "uuid": "${uuid()}",
             "version": [1, 0, 0],
             "type": "data",
         }
     ],
     "dependencies": [
         {
             "uuid": "${uuid()}",
             "version": [0, 1, 0]
         },
         {
             "uuid": "${uuid()}",
             "version": [0, 1, 0]
         },
         {
             "uuid": "${uuid()}",
             "version": [0, 1, 0]
         }
     ]
 }
    `)
    await interaction.reply('ビヘイビアタイプのmanifestを作成しました。')
    await interaction.channel.send({ files:["manifest.json"]}).catch(e => {
 interaction.editReply('Error! Check the permissions.')
 })
  
  }
    if(interaction.commandName === "re"){
    let name = "テクスチャサンプル"

    if(interaction.options.get('name')) name = interaction.options.get('name').value

   fs.writeFileSync('manifest.json',`{
    "format_version": 1,
    "header": {
        "name": "${name}",
        "description": "このアドオンはbotで作られました。", 
        \n   "uuid": "${uuid()}",
        "version": [0, 0, 0]
    },
    "modules": [
        {
            "description": "このアドオンはbotで作られました。",
            "type": "resources",
            "uuid": "${uuid()}",
            "version": [0, 0, 0]
        }
    ]
   }`)
   await interaction.reply('リソースタイプのmanifestを作成しました。')
   await interaction.channel.send({ files:["manifest.json"]}).catch(e => {
interaction.editReply('Error! Check the permissions.')
})
    }

  if(interaction.commandName === "uuid"){
    let uuids = ""
    for(let i = 0; i<10; i++){
      uuids += `\`${uuid()}\`\n`
    }
    const embed = new MessageEmbed().setTitle('UUID一覧').setDescription(uuids)
   interaction.reply({embeds:[embed]})
  }
  if(interaction.commandName === "function"){
     fs.writeFileSync(`function.mcfunction`,`${interaction.options.get('commands').value}`)
     interaction.reply({ files:["function.mcfunction"]})
  }


 })*/
  
  client.login(process.env.token)