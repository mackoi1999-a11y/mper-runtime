# PRG Lab v0 Docs Index

このドキュメントは、Instinct Reaction Sim を **PRG Lab v0** として保全し、今後の MPER Runtime / Persona Reaction Graph 拡張に向けた設計メモの入口にするための索引です。

v0 ではまだ実装を増やしません。現在の2D UIと反応パイプラインを保ち、将来追加したい Runtime State、Memory、Behavior Policy、JSON Import / Export などを設計メモとして整理します。

## v0 の位置づけ

PRG Lab v0 は、以下を確認するための最小実験場です。

- 刺激値をキャラクターごとに評価する。
- `like` / `dislike` / `neutral` / `unknown` に分類する。
- 分類から `approach` / `escape` / `stay` / `wander` を決める。
- 行動を2D UIで確認する。
- 反応ログを人間が読める形で残す。

## ドキュメント一覧

### prg-layer-notes

[prg-layer-notes.md](prg-layer-notes.md)

PRG の処理層を整理するメモです。現在のパイプラインである `sensorInput -> evaluatePreference -> determineInstinctReaction -> processKnowledgeDomain -> processClassificationTreatment -> applyAction` を、観察可能な反応レイヤーとして扱います。

### future-runtime-state

[future-runtime-state.md](future-runtime-state.md)

単発の刺激反応だけでなく、キャラクターが持続的に保持する内部状態を検討するメモです。感情、信頼、恐怖、疲労、最近受けた刺激、現在の行動方針などの候補を整理します。

### runtime-persona-container

[runtime-persona-container.md](runtime-persona-container.md)

キャラクターペルソナJSONをランタイム人格コンテナとして扱うためのメモです。`static_profile` と `runtime_state` を分離し、`growth_log`、`memory_summary`、`behavior_policy` を持つ構造を検討します。

### persistent-enemy-memory

[persistent-enemy-memory.md](persistent-enemy-memory.md)

逃げ延びた敵をセーブデータに保存し、遭遇ログによって成長させるためのメモです。再登場時の行動変化、保存数上限、保存優先度、名前付き・中ボス化の可能性を整理します。

### npc-memory-system

[npc-memory-system.md](npc-memory-system.md)

NPCを説得、雇用、同行できる存在として扱い、解散後も経験ログや関係変化を保持するためのメモです。信頼、不満、愛着、恐怖による再会時の反応変化を整理します。

### game-concept-demon-king

[game-concept-demon-king.md](game-concept-demon-king.md)

魔王討伐を最終目的にしつつ、誰とどう攻略するかをプレイヤーに委ねるゲーム構想です。モブNPCや敵も履歴を持ち、プレイヤー固有の物語が生まれる方向性を整理します。

## 最低限の用語表

| 用語 | 意味 | v0での扱い |
| --- | --- | --- |
| PRG | Persona Reaction Graph。刺激から反応・行動までの中間層を観察する設計概念。 | 現在の反応パイプラインをPRGの最小形として扱う。 |
| Instinct Reaction Sim | 現在の2D UIプロトタイプ。 | PRG Lab v0 の実行可能なデバッグUI。 |
| MPER Runtime | Persona、Emotion、Reaction、Prompt / Behavior を構造で制御するランタイム。 | 今後接続する上位概念。 |
| Preference | 入力刺激に対する `like` / `dislike` / `neutral` / `unknown` の分類。 | `PreferenceMap` が扱う。 |
| Reaction | Preference から導かれる本能反応。 | `approach` / `escape` / `stay` / `wander`。 |
| Knowledge Domain | Preference / Reaction に意味づけを与える層。 | 現在は `valuation` を付与する薄い層。 |
| Classification Treatment | 分類後の処理層。 | 現在は pass-through。将来の補正・政策適用の場所。 |
| Behavior Executor | 反応を実際の行動に変換する層。 | 2D座標の移動を担当。 |
| Runtime State | プレイ中に変化する内部状態。 | v0では未実装。docsで設計中。 |
| static_profile | キャラクターの固定プロフィール。 | v0では未実装。人格コンテナ案で定義。 |
| runtime_state | キャラクターの実行時状態。 | v0では未実装。人格コンテナ案で定義。 |
| growth_log | キャラクターの成長・変化履歴。 | v0では未実装。将来のMemory基盤。 |
| memory_summary | 長いログを要約した記憶。 | v0では未実装。将来のAI要約と接続。 |
| behavior_policy | 状態と記憶から導く行動方針。 | v0では未実装。将来の行動制御層。 |
| Persistent Enemy Memory | 逃げ延びた敵の継続記憶。 | v0では設計メモのみ。 |
| NPC Memory | NPCの経験・関係記憶。 | v0では設計メモのみ。 |
| Relationship Memory | プレイヤーとキャラクターの関係履歴。 | v0では設計メモのみ。 |

## 用語統一メモ

- ファイル名やJSONキーでは、必要に応じて snake_case を使います。例: `runtime_state`, `growth_log`, `memory_summary`, `behavior_policy`。
- 説明文では読みやすさを優先し、Runtime State / Growth Log / Memory Summary / Behavior Policy のような表記を使います。
- 「記憶」は広義の Memory として扱い、敵用は Persistent Enemy Memory、NPC用は NPC Memory、関係用は Relationship Memory と呼び分けます。
- v0では、設計用語をコードへ無理に反映しません。既存の Instinct Reaction Sim を壊さず保全します。
