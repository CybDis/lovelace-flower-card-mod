# Copilot-Instruktionen

Die verbindlichen Instruktionen für dieses Repository stehen in der Datei
[`AGENTS.md`](../AGENTS.md) im Repo-Root. Lies diese Datei und befolge sie
bei jeder Änderung.

Kernregeln (Details in `AGENTS.md`):

- Versionsschema: CalVer `JJJJ.M.T`, Betas als `JJJJ.M.T-beta.N`
  (Version steht in `package.json` und steuert den Release-Workflow).
- Vor jedem Push nach einer Änderung die Version auf die nächste
  Beta-Version erhöhen und das Bundle neu bauen (`npm run build`).
- Stabile Releases (ohne `-beta`) nur auf ausdrückliche Text-Anweisung
  des Maintainers erstellen.
- Nach jedem stabilen Release alle Beta-Releases und Beta-Tags seit dem
  letzten stabilen Release löschen.
