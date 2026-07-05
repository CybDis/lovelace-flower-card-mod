# Instruktionen für KI-Coding-Agenten (Claude, Copilot, Codex)

Diese Datei ist die zentrale Anweisungsdatei für alle KI-Coding-Agenten in
diesem Repository. `CLAUDE.md` und `.github/copilot-instructions.md` verweisen
hierher — Änderungen an den Regeln bitte **nur in dieser Datei** vornehmen.

## Projekt

Lovelace Flower Card Mod — eine Custom Card für Home Assistant
(HACS-Integration). Der TypeScript-Quellcode liegt in `src/`, das
ausgelieferte Bundle ist `flower-card.js` (+ `flower-card.js.gz`) im
Repo-Root.

Nach jeder Code-Änderung in `src/` muss das Bundle neu gebaut und mit
committet werden:

```bash
npm install        # falls node_modules fehlt
npm run build      # lint + webpack, erzeugt flower-card.js und .gz
```

## Versionierungskonzept

Die Version steht in `package.json` und folgt einem **datumsbasierten Schema
(CalVer)**:

```
JJJJ.M.T           → stabile Release-Version, z.B. 2026.6.26
JJJJ.M.T-beta.N    → Beta-/Vorabversion,     z.B. 2026.7.5-beta.1
```

- `JJJJ.M.T` ist das Datum der Änderung (Jahr.Monat.Tag, ohne führende
  Nullen).
- `N` ist eine fortlaufende Nummer, die bei mehreren Betas zum selben
  Datum hochgezählt wird (`-beta.1`, `-beta.2`, …).

**Der Release-Prozess ist automatisiert:** Der Workflow
`.github/workflows/release.yml` läuft bei jedem Push auf `master`, der
`package.json` ändert. Er baut das Projekt, erstellt den Git-Tag
`v<version>` und ein GitHub-Release. Enthält die Versionsnummer `beta`,
wird das Release als **Pre-Release** markiert, sonst als **stabiles
Release**. Es dürfen daher keine Tags oder Releases manuell erzeugt
werden — die Versionsnummer in `package.json` steuert alles.

## Regeln für Versionen und Releases

### 1. Jeder Push nach einer Änderung erzeugt eine Beta-Version

- Bei **jeder** Code-Änderung wird vor dem Push die Version in
  `package.json` auf die nächste Beta-Version gesetzt:
  aktuelles Datum + nächste freie Beta-Nummer, z.B. `2026.7.5-beta.1`.
- Existiert zum selben Datum bereits eine Beta (als Tag oder Release),
  wird `N` hochgezählt (`-beta.2`, `-beta.3`, …). Vor der Vergabe die
  vorhandenen Tags/Releases prüfen.
- Eine bereits vergebene Versionsnummer darf nie wiederverwendet werden.
- Das Bundle (`flower-card.js`, `flower-card.js.gz`) wird mit der neuen
  Version zusammen committet und gepusht.

### 2. Stabile Releases nur auf ausdrückliche Anweisung

- Eine stabile Release-Version (`JJJJ.M.T` ohne `-beta`-Suffix) wird
  **ausschließlich** erstellt, wenn der Maintainer (CybDis) dies per
  Text ausdrücklich anweist (z.B. „erzeuge ein Release", „mach die
  Version final").
- Niemals eigenmächtig eine Beta zu einem stabilen Release befördern.
- Für das Release wird die Version in `package.json` auf das Datum ohne
  Beta-Suffix gesetzt (z.B. `2026.7.5-beta.3` → `2026.7.5`).

### 3. Nach jedem stabilen Release werden die Betas gelöscht

- Sobald ein stabiles Release erstellt wurde, werden **alle**
  Beta-Releases und die zugehörigen Beta-Git-Tags gelöscht, die zu
  diesem Release geführt haben (alle seit dem vorherigen stabilen
  Release erzeugten `*-beta.*`-Versionen).
- Zu löschen sind jeweils beides: das GitHub-Release **und** der
  Git-Tag (`v<version>`).
- Das stabile Release und sein Tag bleiben selbstverständlich bestehen.

### Zusammengefasster Ablauf

```
Änderung → Version auf JJJJ.M.T-beta.N erhöhen → bauen → committen → pushen
   (Workflow erzeugt auf master automatisch das Beta-Pre-Release)

Maintainer sagt „Release" → Version auf JJJJ.M.T (ohne beta) setzen
   → bauen → committen → pushen
   (Workflow erzeugt das stabile Release)
   → danach alle Beta-Releases + Beta-Tags seit dem letzten stabilen
     Release löschen
```

## Allgemeine Hinweise

- Feature-Arbeit erfolgt auf Branches; der Release-Workflow reagiert nur
  auf `master`. Die Versionserhöhung gehört trotzdem in den Branch, damit
  das Release beim Merge automatisch entsteht.
- Commit-Messages klar und beschreibend halten; bei Versionserhöhungen
  die Version in der Message nennen (z.B. `release: 2026.7.5-beta.2`).
