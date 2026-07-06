# Instinct Reaction Sim

Instinct Reaction Sim は、MPER Runtime / Persona Reaction Graph のためのデバッグUI原型です。

現在の状態を **PRG Lab v0** として保全します。v0 では、0〜10の刺激値を複数キャラクターに入力し、各キャラクターの `like` / `dislike` / `neutral` / `unknown` 判定から、`approach` / `escape` / `stay` / `wander` の行動を2D UIで可視化します。

この段階では実装拡張よりも、既存の動作を壊さず、反応パイプラインと将来構想を観察・整理できる状態にすることを優先します。

## PRG Lab v0 の目的

- Persona Reaction Graph の最小実験場にする。
- MPER Runtime の反応パイプラインを目で確認できるようにする。
- Instinct Reaction Sim の既存挙動を保全する。
- 将来の Runtime State、Memory、Behavior Policy、JSON Import / Export の土台にする。
- 実装と設計メモを分け、次の拡張判断をしやすくする。

## 現在の仕様

- 0〜10の刺激入力ボタン。
- 初期5体のキャラクター生成。
- キャラクター追加。
- リセット。
- PLAYER中心の2Dシミュレーション表示。
- `like` / `dislike` / `neutral` / `unknown` 判定。
- `approach` / `escape` / `stay` / `wander` 行動。
- キャラクター個性の表示 / 非表示。
- ログ表示。
- ログコピー。
- スマホ表示対応。

## ディレクトリ構成

```text
instinct-reaction-sim/
  index.html
  README.md
  docs/
    index.md
    future-runtime-state.md
    game-concept-demon-king.md
    npc-memory-system.md
    persistent-enemy-memory.md
    prg-layer-notes.md
    runtime-persona-container.md
  prototype/
    code_artifact.html
  src/
    core/
      BehaviorExecutor.js
      CharacterModel.js
      ClassificationTreatment.js
      KnowledgeDomain.js
      LogSystem.js
      PreferenceMap.js
      ReactionPipeline.js
    data/
      config.js
    ui/
      app.js
      styles.css
```

## 起動方法

ブラウザで `index.html` を開いてください。ビルド、外部API、DBは不要です。

原本の単一HTMLは `prototype/code_artifact.html` に保全しています。

## 反応パイプライン

```text
sensorInput
-> evaluatePreference
-> determineInstinctReaction
-> processKnowledgeDomain
-> processClassificationTreatment
-> applyAction
-> UI更新
-> ログ出力
```

現在は `ReactionPipeline` が入力値、好悪判定、本能反応、知識領域、分類処理をつなぎ、`BehaviorExecutor` が2D座標へ反映します。

## docs 一覧

docs の入口は [docs/index.md](docs/index.md) です。

- [prg-layer-notes.md](docs/prg-layer-notes.md)  
  PRG の処理層、刺激入力から行動出力までの観察ポイントを整理します。

- [future-runtime-state.md](docs/future-runtime-state.md)  
  単発反応を超えて、キャラクターが持続的に保持する内部状態の候補を整理します。

- [runtime-persona-container.md](docs/runtime-persona-container.md)  
  `static_profile` と `runtime_state` を分離し、`growth_log` / `memory_summary` / `behavior_policy` を持つ人格コンテナ案を整理します。

- [persistent-enemy-memory.md](docs/persistent-enemy-memory.md)  
  逃げ延びた敵の保存、遭遇ログによる成長、再登場時の行動変化、名前付き・中ボス化を整理します。

- [npc-memory-system.md](docs/npc-memory-system.md)  
  NPCの説得、雇用、同行、解散後の経験ログ、関係変化、再会時の反応を整理します。

- [game-concept-demon-king.md](docs/game-concept-demon-king.md)  
  魔王討伐を最終目的にしつつ、NPCや敵の履歴でプレイヤー固有の物語が生まれるゲーム構想を整理します。

## 用語の基本方針

- **PRG**: Persona Reaction Graph の略。刺激から反応・行動までの中間層を観察するための設計概念。
- **MPER Runtime**: Persona、Emotion、Reaction、Prompt / Behavior を構造で制御するランタイム。
- **Runtime State**: プレイ中に変化するキャラクターの内部状態。
- **Memory**: 遭遇、関係、経験、成長ログなど、再登場や行動変化に影響する記録。
- **Behavior Policy**: 現在の状態と記憶から導かれる行動方針。

詳細な用語表は [docs/index.md](docs/index.md) にまとめます。

## 今後の拡張予定

- Runtime State
- Growth Log
- Persistent Enemy Memory
- NPC Memory
- Relationship Memory
- Behavior Policy
- AIによるログ要約
- JSON Import / Export
- Persona JSON / Preference JSON の分離
- Reaction Graph の可視化
