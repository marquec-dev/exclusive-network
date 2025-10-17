const { 
  Client, 
  GatewayIntentBits, 
  Partials,
  PermissionsBitField,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  StringSelectMenuBuilder,
  ChannelType
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel],
});

// CONFIG
const CONFIG = {
  STAFF_ROLE: "1427228183761125516",
  LOGS_CHANNEL: "1428871077811196035",
  CATEGORIES: {
    soporte: "1428867674393542766",
    dudas: "1428867674393542766",
    bugs: "1428867674393542766",
    cks: "1428867674393542766",
    entrada: "1428867674393542766",
    donaciones: "1428867674393542766",
    devoluciones: "1428867674393542766",
    apelaciones: "1428867674393542766"
  }
};

// Mensajes / Preguntas
const MENSAJES = {
  soporte: "🛠️ Un miembro del staff atenderá tu caso en breve. Por favor, ten paciencia mientras revisamos tu problema.",
  dudas: "❓ Gracias por tu consulta. Un miembro del staff responderá tu duda lo antes posible.",
  bugs: "🐞 Hemos recibido tu reporte de bug. Nuestro equipo revisará lo ocurrido y tomará nota para solucionarlo.",
  cks: "⚔️ Tu solicitud de CK ha sido recibida. Un miembro del staff la revisará y confirmará contigo los detalles.",
  entrada: "📝 Gracias por tu interés en unirte al staff. Revisaremos tu solicitud y te contactaremos pronto con una respuesta.",
  donaciones: "💰 Gracias por tu donación 🙌. Un miembro del equipo te asistirá con el proceso.",
  devoluciones: "📦 Tu solicitud de devolución ha sido registrada. Un miembro del staff revisará tu caso y se pondrá en contacto contigo.",
  apelaciones: "📜 Tu apelación ha sido recibida. El equipo administrativo revisará tu caso y se comunicará contigo con una resolución."
};

const PREGUNTAS = {
  soporte: [
    { id: "p1", label: "👤 ¿Cuál es tu ID o nombre en el servidor?", style: TextInputStyle.Short },
    { id: "p2", label: "📌 Describe brevemente tu problema", style: TextInputStyle.Paragraph },
    { id: "p3", label: "🎥 ¿Tienes clip de lo ocurrido?", style: TextInputStyle.Short }
  ],
  dudas: [
    { id: "p1", label: "❓ ¿Cuál es tu duda?", style: TextInputStyle.Paragraph }
  ],
  bugs: [
    { id: "p1", label: "🐞 Describe brevemente el problema", style: TextInputStyle.Paragraph }
  ],
  cks: [
    { id: "p1", label: "👤 Nombre IC", style: TextInputStyle.Short },
    { id: "p2", label: "📌 Motivo", style: TextInputStyle.Paragraph }
  ],
  entrada: [
    { id: "p1", label: "🎂 Edad OOC", style: TextInputStyle.Short },
    { id: "p2", label: "📝 Motivo por el cual quieres entrar", style: TextInputStyle.Paragraph },
    { id: "p3", label: "💡 ¿Qué puedes aportar al equipo?", style: TextInputStyle.Paragraph },
    { id: "p4", label: "⏰ Disponibilidad horaria", style: TextInputStyle.Short }
  ],
  donaciones: [], 
  devoluciones: [
    { id: "p1", label: "📦 Artículo", style: TextInputStyle.Short },
    { id: "p2", label: "📌 Motivo", style: TextInputStyle.Paragraph }
  ],
  apelaciones: [
    { id: "p1", label: "📜 Sanción a apelar", style: TextInputStyle.Short },
    { id: "p2", label: "📌 Motivo de la sanción", style: TextInputStyle.Paragraph }
  ]
};

// ---------- messageCreate: panel & normativa ----------
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // Panel
  if (message.content === ".ticketpanel") {
    const embed = new EmbedBuilder()
      .setTitle("🎟️ Sistema de Tickets")
      .setDescription("Selecciona el tipo de ticket en el menú desplegable y completa el formulario (si corresponde).")
      .setColor("Blue")
      .setImage("https://i.imgur.com/TNC3E4u.png");

    const menu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("menu_ticket")
        .setPlaceholder("📂 Selecciona el tipo de ticket")
        .addOptions([
          { label: "Soporte", value: "soporte", emoji: "🛠️" },
          { label: "Dudas", value: "dudas", emoji: "❓" },
          { label: "Bugs", value: "bugs", emoji: "🐞" },
          { label: "CK's", value: "cks", emoji: "⚔️" },
          { label: "Entrada al Staff", value: "entrada", emoji: "📝" },
          { label: "Donaciones", value: "donaciones", emoji: "💰" },
          { label: "Devoluciones", value: "devoluciones", emoji: "📦" },
          { label: "Apelaciones", value: "apelaciones", emoji: "📜" },
        ])
    );

    await message.channel.send({ embeds: [embed], components: [menu] });
    return;
  }

  // Normativa con .normativa-rol (incluye el punto inicial .)
  if (message.content === ".normativa-rol") {
    const embed1 = new EmbedBuilder()
      .setTitle("📜┃Normas Generales")
      .setColor("#2ECC71")
      .setDescription(
        "✅ Respeta a todos los jugadores dentro y fuera de rol.\n" +
        "🚫 Prohibido **discriminación, insultos graves, acoso o toxicidad**.\n" +
        "🚫 No se permite **uso de cheats, exploits, bugs o mods externos**.\n" +
        "🚫 Prohibido **Powergaming (PG)** y **Metagaming (MG)**.\n" +
        "🚫 Queda prohibido el **streamsniping**.\n" +
        "⚖️ Siempre prioriza la **interpretación de tu personaje** sobre tus intereses personales."
      );

    const embed2 = new EmbedBuilder()
      .setTitle("🎭┃Normas de Rol")
      .setColor("#3498DB")
      .setDescription(
        "📌 **Rol de entorno**: actúa como si el mundo fuera real.\n" +
        "📌 **Valora la vida**: no pongas tu vida en riesgo por tonterías.\n\n" +
        "🚫 **NRP (No Roleplay)**: actuar sin lógica o romper rol.\n" +
        "🚫 **RDM (Random Deathmatch)**: matar sin motivo de rol.\n" +
        "🚫 **VDM (Vehicle Deathmatch)**: usar vehículos como arma sin justificación.\n" +
        "🚫 **Combat Logging**: desconectarse para evitar arresto/muerte/robo.\n" +
        "🚫 **Revenge Kill**: vengarse de una muerte sin rol válido.\n" +
        "🚫 **Cop Bait**: provocar policías sin sentido de rol."
      );

    const embed3 = new EmbedBuilder()
      .setTitle("💰┃Normas de Crimen")
      .setColor("#E67E22")
      .setDescription(
        "🔫 Los robos deben estar **planificados y con rol lógico**.\n" +
        "🔫 Secuestros requieren **mínimo 5 policías conectados**.\n" +
        "🚫 No se puede **asaltar en zonas seguras** (hospital, comisaría, garajes principales).\n" +
        "🎭 El uso de máscaras debe ser **justificado**, no permanente.\n" +
        "🪦 En caso de muerte en rol → se aplica **PKT (Perder Conocimiento Total)**."
      );

    const embed4 = new EmbedBuilder()
      .setTitle("🗺️┃Zonas y Entorno")
      .setColor("#F1C40F")
      .setDescription(
        "🏥 **Zonas seguras**: hospital, comisaría, ayuntamiento, garaje central.\n" +
        "🚫 Prohibido iniciar **robos o tiroteos en zonas seguras**.\n" +
        "🔫 Tiroteos masivos deben estar **justificados y con rol lógico**.\n" +
        "🎒 Respeta la **capacidad de tu personaje** (ej. no cargar 20 armas pesadas)."
      );

    const embed5 = new EmbedBuilder()
      .setTitle("💬┃Normas de Comunicación")
      .setColor("#1ABC9C")
      .setDescription(
        "💬 Chat **OOC** solo para emergencias o aclaraciones rápidas.\n" +
        "🚫 Prohibido usar **Discord/WhatsApp OOC** para dar info IC (Metagaming).\n" +
        "🆘 En caso de problemas → usar **/report** o contactar staff, nunca romper el rol."
      );

    const embed6 = new EmbedBuilder()
      .setTitle("⚖️┃Sanciones")
      .setColor("#E74C3C")
      .setDescription(
        "⚠️ Romper las normas puede llevar a: **advertencias, expulsiones temporales o permanentes**.\n" +
        "📌 La administración podrá sancionar conductas no escritas aquí pero que perjudiquen la experiencia de rol."
      )
      .setFooter({ text: "© 2025 · IMAGINE RP" });

    // Enviamos todos los embeds en un solo mensaje (máx 10 embeds)
    await message.channel.send({ embeds: [embed1, embed2, embed3, embed4, embed5, embed6] });
    return;
  }
});

// ---------- interactionCreate: selects, modals y botones ----------
client.on("interactionCreate", async (interaction) => {
  // SELECT MENU (tipo ticket)
  if (interaction.isStringSelectMenu() && interaction.customId === "menu_ticket") {
    const tipo = interaction.values[0];
    const categoria = CONFIG.CATEGORIES[tipo];
    if (!categoria) return interaction.reply({ content: "⚠️ Categoría no configurada.", flags:64 });

    // Si no hay preguntas: crear ticket directo (defer para tener margen)
    if (!PREGUNTAS[tipo] || PREGUNTAS[tipo].length === 0) {
      await interaction.deferReply({ flags:64 });
      await crearTicket(interaction, tipo, categoria, {});
      return;
    }

    // Si hay preguntas: mostrar modal (no defer aquí)
    const modal = new ModalBuilder()
      .setCustomId(`ticket_modal_${tipo}`)
      .setTitle(`Formulario - ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`);

    PREGUNTAS[tipo].forEach((p) => {
      modal.addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder().setCustomId(p.id).setLabel(p.label).setStyle(p.style).setRequired(true)
        )
      );
    });

    await interaction.showModal(modal);
    return;
  }

  // MODAL SUBMIT
  if (interaction.isModalSubmit() && interaction.customId.startsWith("ticket_modal_")) {
    // defer para evitar timeout si algo tarda
    await interaction.deferReply({ flags:64 });
    const tipo = interaction.customId.replace("ticket_modal_", "");
    const categoria = CONFIG.CATEGORIES[tipo];
    const respuestas = {};
    PREGUNTAS[tipo].forEach((p) => {
      try {
        respuestas[p.label] = interaction.fields.getTextInputValue(p.id);
      } catch {
        respuestas[p.label] = "No respondido";
      }
    });

    await crearTicket(interaction, tipo, categoria, respuestas);
    return;
  }

  // BOTÓN: cerrar ticket
  if (interaction.isButton() && interaction.customId === "cerrar_ticket") {
    // respuesta al usuario que ha pulsado
    await interaction.reply({ content: "🔒 Ticket cerrado.", flags:64 });

    // enviamos log
    const logChannel = client.channels.cache.get(CONFIG.LOGS_CHANNEL) || await client.channels.fetch(CONFIG.LOGS_CHANNEL).catch(() => null);
    if (logChannel) {
      const logEmbed = new EmbedBuilder()
        .setTitle("🔒 Ticket cerrado")
        .setColor("Red")
        .setDescription(`El ticket **${interaction.channel.name}** fue cerrado por ${interaction.user.tag} (<@${interaction.user.id}>)`)
        .setTimestamp();
      await logChannel.send({ embeds: [logEmbed] }).catch(() => {});
    }

    // borramos el canal (no await si quieres que continue)
    await interaction.channel.delete().catch(() => {});
    return;
  }
});

// ---------- crearTicket (reusable) ----------
async function crearTicket(interaction, tipo, categoria, respuestas) {
  const guild = interaction.guild;
  const user = interaction.user;

  // sanitize name para evitar caracteres raros
  const safeName = `${tipo}-ticket-${user.username}`.toLowerCase().replace(/[^a-z0-9-_]/g, "-").slice(0, 90);

  const channel = await guild.channels.create({
    name: safeName,
    type: ChannelType.GuildText,
    parent: categoria,
    permissionOverwrites: [
      { id: guild.roles.everyone.id, deny: [PermissionsBitField.Flags.ViewChannel] },
      { id: user.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
      { id: CONFIG.STAFF_ROLE, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
    ],
  }).catch(err => { console.error("Error creando canal ticket:", err); return null; });

  if (!channel) {
    // si hay un interaction ya deferred/replied, edit o reply según corresponda
    if (interaction.deferred || interaction.replied) {
      try { await interaction.editReply({ content: "❌ No se pudo crear el ticket. Revisa permisos del bot.", embeds: [] }); } catch {}
    } else {
      try { await interaction.reply({ content: "❌ No se pudo crear el ticket. Revisa permisos del bot.", flags:64 }); } catch {}
    }
    return;
  }

  // Preparamos campos del embed con las respuestas (si existen)
  const fields = Object.entries(respuestas || {}).map(([label, value]) => ({
    name: label,
    value: value || "No respondido"
  }));

  const ticketEmbed = new EmbedBuilder()
    .setTitle(`📩 Nuevo Ticket de ${user.tag}`)
    .setColor("Green")
    .addFields(fields)
    .addFields({ name: "📂 Tipo de Ticket", value: tipo, inline: true })
    .addFields({ name: "ℹ️ Información", value: MENSAJES[tipo] || "Sin información adicional", inline: false })
    .setTimestamp();

  const cerrarBtn = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("cerrar_ticket")
      .setLabel("Cerrar Ticket")
      .setStyle(ButtonStyle.Danger)
      .setEmoji("🔒")
  );

  await channel.send({
    content: `<@&${CONFIG.STAFF_ROLE}> | Ticket creado por <@${user.id}>`,
    embeds: [ticketEmbed],
    components: [cerrarBtn]
  }).catch(err => console.error("Error enviando mensaje en canal ticket:", err));

  // LOG: creación con detalles (incluye respuestas)
  const logChannel = client.channels.cache.get(CONFIG.LOGS_CHANNEL) || await client.channels.fetch(CONFIG.LOGS_CHANNEL).catch(() => null);
  if (logChannel) {
    const logEmbed = new EmbedBuilder()
      .setTitle("📩 Nuevo Ticket creado")
      .setColor("Green")
      .setDescription(`Ticket **${channel.name}** creado por ${user.tag} (<@${user.id}>)`)
      .addFields({ name: "📂 Tipo", value: tipo, inline: true })
      .setTimestamp();

    // si hay respuestas, las añadimos como campo (puede ser largo)
    const respuestasText = Object.entries(respuestas || {}).map(([k, v]) => `**${k}**: ${v}`).join("\n") || "Sin respuestas";
    logEmbed.addFields({ name: "📝 Respuestas", value: respuestasText.length > 1024 ? respuestasText.slice(0, 1000) + "..." : respuestasText });

    await logChannel.send({ embeds: [logEmbed] }).catch(() => {});
  }

  // Respondemos al usuario que creó el ticket
  try {
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply({ content: `✅ Tu ticket ha sido creado en: ${channel}`, embeds: [], flags:64 });
    } else {
      await interaction.reply({ content: `✅ Tu ticket ha sido creado en: ${channel}`, flags:64 });
    }
  } catch (err) {
    console.error("Error respondiendo interacción ticket:", err);
  }
}

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === ".normativa-discord") {
      const embed = new EmbedBuilder()
          .setColor("#5865F2")
          .setImage("https://i.imgur.com/KAUvYQB.png") 
          .setTitle("📜 Normativa de Discord - IMAGINE RP")
          .setDescription(
              [
                  "🚫 No se permite contenido ilegal (piratería, drogas, terrorismo, explotación, etc.).",
                  "🚫 Prohibido el odio, acoso, discriminación, amenazas o violencia.",
                  "🚫 Nada de spam, estafas, phishing o contenido dañino.",
                  "🚫 Prohibido compartir datos privados sin consentimiento.",
                  "🚫 Contenido NSFW solo en canales marcados como tal y nunca con menores.",
                  "🚫 No usar bots o modificaciones que violen la seguridad de Discord.",
                  "🚫 El servidor debe respetar derechos de autor y propiedad intelectual.",
                  "❤️ Respeto entre todos los miembros.",
                  "🚫 Prohibido insultar, discriminar o acosar.",
                  "📄 No spam ni flood en chats o canales de voz.",
                  "📑 Mantén el orden en los canales.",
                  "🚫 No se permite publicidad de otros servidores.",
                  "✅ Uso correcto de nombres e imágenes de perfil (sin ofensas o contenido sensible).",
                  "Además de esta normativa, todos los usuarios deben cumplir con las [Normas de la Comunidad de Discord](https://discord.com/guidelines) y los [Términos de Servicio de Discord](https://discord.com/terms)."
              ].join("\n\n")
          )
          .setFooter({ text: "© 2025 · IMAGINE RP" });

      await message.channel.send({ embeds: [embed] });
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === ".normativa-cc") {
      const embed = new EmbedBuilder()
          .setColor("#7B1F1F")
          .setImage("https://i.imgur.com/CVXJxRi.png") 
          .setTitle("📜 Normativa para Creadores de Contenido – IMAGINE RP")
          .setDescription(
              [
                  "**1. Requisitos generales**",
                  "1.1. Todos los creadores de contenido deben estar registrados en el servidor y haber informado al Staff de su actividad (Twitch, YouTube, Facebook Gaming, Kick u otras plataformas).",
                  "1.2. Es obligatorio tener la whitelist aprobada y cumplir las normas generales del servidor.",
                  "1.3. Se recomienda tener en el título o descripción de sus transmisiones el nombre del servidor y enlace a la comunidad.",
                  "",
                  "**2. Conducta en directo o grabación**",
                  "2.1. Se prohíbe mostrar o difundir cualquier tipo de exploits, bugs, cheats o hacks.",
                  "2.2. Está prohibido realizar metagaming en directo (dar o recibir información del chat para beneficiar a tu personaje).",
                  "2.3. No está permitido mostrar información sensible del servidor (scripts internos, menús de Staff, configuraciones privadas, etc.).",
                  "2.4. Los creadores deben mantener el rol en todo momento, sin romper la inmersión con comentarios OOC excesivos durante la transmisión.",
                  "2.5. El creador es responsable del comportamiento de su chat. No se permitirá fomentar odio, toxicidad o ataques hacia otros jugadores o al servidor.",
                  "",
                  "**3. Uso de logos, nombres y marca del servidor**",
                  "3.1. Los creadores tienen permitido usar el nombre y logo del servidor únicamente con fines de promoción de sus transmisiones y contenido.",
                  "3.2. Queda prohibida la alteración o mal uso de la marca que pueda dañar la reputación del servidor.",
                  "3.3. El Staff podrá solicitar la remoción de contenido si incumple las normas o daña la imagen del servidor.",
                  "",
                  "**4. Contenido permitido y restringido**",
                  "4.1. **Permitido:**\n- Streamings de rol y mecánicas del servidor.\n- Clips y highlights de situaciones IC (in-character).\n- Guías básicas para nuevos jugadores (siempre con aprobación del Staff).",
                  "4.2. **Restringido:**\n- Mostrar bugs/exploits aunque sean con 'fines informativos'.\n- Guías que revelen mecánicas ocultas o información que pueda arruinar la experiencia de rol.\n- Difusión de sanciones o asuntos internos de Staff.",
                  "",
                  "**5. Relación con el Staff**",
                  "5.1. Los creadores deben respetar las decisiones del Staff, tanto dentro como fuera del rol.",
                  "5.2. En caso de conflicto o problema en directo, se recomienda usar escenas o pausas y resolver la situación fuera de la transmisión.",
                  "5.3. Está prohibido hacer críticas destructivas o difundir información falsa del servidor en sus plataformas.",
                  "",
                  "**6. Beneficios de ser creador en el servidor**",
                  "6.1. Promoción en las redes oficiales del servidor (según criterio del Staff).",
                  "6.2. Acceso a canales especiales en Discord para coordinar contenido y colaboraciones.",
                  "6.3. Posibilidad de eventos exclusivos para creadores aprobados.",
                  "",
                  "**7. Sanciones**",
                  "El incumplimiento de esta normativa puede conllevar:\n- Advertencias formales.\n- Suspensión temporal de permisos de creador.\n- Expulsión de la comunidad o ban permanente del servidor, según la gravedad.",
                  "",
                  "✅ **Aceptación:**\nAl crear contenido dentro de IMAGINE RP, el creador acepta estas normas y se compromete a respetarlas."
              ].join("\n\n")
          )
          .setFooter({ text: "© 2025 · IMAGINE RP" });

      await message.channel.send({ embeds: [embed] });
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === ".normativa-facciones") {
      const embed = new EmbedBuilder()
          .setColor("#f74d4d") // Rojo (logo facs ilegales)
          .setImage("https://i.imgur.com/YodlzPV.png") 
          .setTitle("📜 Normativa de Facciones Ilegales – IMAGINE RP")
          .setDescription(
              [
                  "**1. Requisitos generales**",
                  "1.1. Para **crear** una facción ilegal se requiere aprobación previa del Staff.",
                  "1.2. Cada facción debe contar con un líder oficial registrado ante el Staff.",
                  "1.3. El líder es responsable de la conducta de los integrantes y de mantener la facción dentro del rol.",
                  "",
                  "**2. Conducta y rol dentro de facciones ilegales**",
                  "2.1. El rol debe ser siempre serio, coherente e inmersivo.",
                  "2.2. Se prohíbe el 'combat logging' (desconectarse para evitar arrestos, robos o enfrentamientos).",
                  "2.3. El rol de una facción debe priorizar las interacciones con otras bandas, mafias o grupos, fomentando historias y conflictos sin caer en simples tiroteos.",
                  "",
                  "**3. Uso de armas, drogas y economía ilegal**",
                  "3.1. El acceso a armas y drogas estará regulado por el Staff.",
                  "3.2. Se prohíbe acumular armamento de forma irreal o venderlo fuera de rol.",
                  "3.3. La venta de drogas, armas o materiales ilegales debe realizarse exclusivamente en situaciones de rol válidas.",
                  "3.4. Cualquier intento de **duplicación, bug abuse o hacks** será sancionado con ban permanente.",
                  "",
                  "**4. Enfrentamientos y conflictos**",
                  "4.1. Los enfrentamientos deben estar **justificados con rol previo** (disputas, traiciones, negocios, etc.).",
                  "4.2. Queda prohibido atacar a otras facciones sin contexto o únicamente 'por diversión'.",
                  "4.3. En caso de guerra entre facciones, se debe informar previamente al Staff para supervisión.",
                  "",
                  "**5. Relación con el entorno y otros jugadores**",
                  "5.1. Los civiles deben ser tratados como parte del rol, sin abusar de ellos con robos constantes.",
                  "5.2. El secuestro está permitido solo con rol válido y con un límite razonable de tiempo (máx. 30 minutos).",
                  "5.3. Queda prohibido forzar a otro jugador a entregar bienes o realizar acciones sin un contexto válido de rol.",
                  "5.4. La extorsión o amenazas deben estar dentro de un marco lógico de rol.",
                  "",
                  "**6. Relación con el Staff**",
                  "6.1. El Staff puede intervenir en cualquier momento para corregir o detener situaciones fuera de rol.",
                  "6.2. Incumplimientos reiterados pueden provocar la disolución inmediata de la facción.",
                  "",
                  "**7. Sanciones**",
                  "El incumplimiento de esta normativa puede derivar en:\n- Advertencias formales.\n- Expulsión de la facción.\n- Ban permanente del servidor (en casos graves).",
                  "",
                  "✅ **Aceptación:**\nAl formar parte de una facción ilegal en **IMAGINE RP**, el jugador acepta esta normativa y se compromete a respetarla."
              ].join("\n\n")
          )
          .setFooter({ text: "© 2025 · IMAGINE RP" });

      await message.channel.send({ embeds: [embed] });
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === ".normativa-legales") {
      const embed = new EmbedBuilder()
          .setColor("#3480eb") // Azul
          .setImage("https://i.imgur.com/4RHDI3j.png")
          .setTitle("📜 Normativa de Facciones Legales (Negocios) – IMAGINE RP")
          .setDescription(
              [
                  "**1. Requisitos generales**",
                  "1.1. Para **crear** un negocio o facción legal se requiere aprobación previa del Staff.",
                  "1.2. Cada negocio debe contar con un líder responsable registrado ante el Staff.",
                  "1.3. Todos los integrantes deben cumplir las normas generales del servidor.",
                  "1.4. El líder es responsable de la organización interna y de mantener el negocio dentro de un rol coherente.",
                  "",
                  "**2. Conducta y rol dentro de negocios**",
                  "2.1. Los negocios deben fomentar un rol serio, inmersivo y coherente con la temática del servidor.",
                  "2.2. Está prohibido abusar de un negocio para realizar actividades ilegales encubiertas sin autorización del Staff.",
                  "2.3. El personal del negocio debe tratar con respeto tanto a clientes como a otros trabajadores.",
                  "2.4. Se deben mantener las instalaciones y actividades dentro del marco del rol.",
                  "2.5. El uso del negocio para fines OOC (fuera de rol) está prohibido.",
                  "",
                  "**3. Economía y administración**",
                  "3.1. Los precios de productos o servicios deben ser coherentes con la economía del servidor.",
                  "3.2. El Staff podrá intervenir si detecta precios abusivos o que afecten al balance del servidor.",
                  "3.3. La contabilidad del negocio debe ser clara: ingresos, gastos y pagos a empleados deben gestionarse dentro del rol.",
                  "3.4. Se prohíbe transferir fondos del negocio a cuentas personales sin un rol que lo justifique.",
                  "",
                  "**4. Relación con clientes y otros jugadores**",
                  "4.1. Todos los clientes deben recibir un trato justo e igualitario dentro del rol.",
                  "4.2. Los negocios no pueden negarse a atender a clientes sin una justificación válida de rol.",
                  "4.3. Las disputas con clientes deben resolverse mediante rol, evitando insultos o conflictos OOC.",
                  "4.4. Los negocios pueden generar rol entre facciones (legales o ilegales) siempre que se mantenga dentro de los límites de la normativa.",
                  "",
                  "**5. Relación con el Staff**",
                  "5.1. El Staff podrá supervisar la gestión de negocios en cualquier momento.",
                  "5.2. Los líderes deben mantener comunicación activa con el Staff para coordinar contrataciones, expansiones o eventos especiales.",
                  "5.3. El Staff podrá retirar la autorización de un negocio en caso de incumplimientos graves o abandono de rol.",
                  "",
                  "**6. Sanciones**",
                  "- Advertencias formales.",
                  "- Expulsión del líder o de integrantes.",
                  "- Cierre temporal o definitivo del negocio.",
                  "- Ban del servidor en casos graves.",
                  "",
                  "✅ **Aceptación:**\nAl formar parte de una facción legal o negocio en **IMAGINE RP**, el jugador acepta esta normativa y se compromete a respetarla."
              ].join("\n\n")
          )
          .setFooter({ text: "© 2025 · IMAGINE RP" });

      await message.channel.send({ embeds: [embed] });
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === ".servidores") {
    const embed = new EmbedBuilder()
      .setTitle("🌐 Servidores Oficiales")
      .setImage("https://i.imgur.com/cmVAI99.png")
      .setDescription(
        "**Aquí tienes los enlaces de los servidores de las diferentes facciones de IMAGINE RP:**\n\n" +
        "🔴 **ILEGALES:** [Entrar](https://discord.gg/aKMuxbZG78)\n\n" +
        "🟢 **LEGALES:** [Entrar](https://discord.gg/gh5K7fyAK8)\n\n" +
        "⚕️ **EMS:** [Entrar](https://discord.gg/B6gpMs3Ufw)\n\n" +
        "👮 **LSPD:** [Entrar](https://discord.gg/gZJ8zzHscM)\n\n" +
        "🕵️ **FIB:** [Entrar](https://discord.gg/3zpqSxKkyH)"
      )
      .setColor("Blue")
      .setFooter({ text: "© 2025 · IMAGINE RP" });

    await message.channel.send({ embeds: [embed] });
  }
});
// ready
const express = require("express");
const server = express();
server.all("/", (req, res) => {
  res.send("✅ Bot EXCLUSIVE está activo.");
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🌐 Servidor web encendido en el puerto ${PORT}`));

// discord
client.once("clientReady", () => {
  console.log(`✅ EXCLUSIVE BOT iniciado como ${client.user.tag}`);
});
client.login(process.env.TICKET);