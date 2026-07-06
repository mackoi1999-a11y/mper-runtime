# Runtime Persona Container

Runtime Persona Container は、キャラクターの固定プロフィールと実行時に変化する人格状態を分離して扱うための設計メモです。

## 基本方針

キャラクターペルソナJSONは、単なる設定ファイルではなく、ランタイム人格コンテナとして扱います。

固定的な情報は `static_profile` に置き、プレイ中に変化する状態は `runtime_state` に置きます。これにより、初期人格を保ちながら、遭遇、記憶、成長、関係性による変化を管理できます。

## static_profile

`static_profile` は、キャラクターの初期設計や基本人格を表します。

候補:

- name
- species
- role
- baseline_traits
- default_emotion_bias
- speech_style
- preference_seed
- boundaries

これは基本的にキャラクターの初期値であり、ゲーム中に頻繁には変えません。

## runtime_state

`runtime_state` は、プレイ中に変化する状態です。

候補:

- current_emotion
- trust
- fear
- frustration
- attachment
- threat_level
- current_goal
- current_behavior
- last_interaction

PRG / MPER Runtime は、この `runtime_state` をもとに反応や行動方針を決めます。

## growth_log

`growth_log` は、キャラクターがどのように変化してきたかを記録します。

例:

- プレイヤーに助けられた
- 戦闘から逃げ延びた
- 報酬を受け取った
- 約束を破られた
- 何度も同じ刺激を受けた

長期的には、このログを要約して `memory_summary` に反映します。

## memory_summary

`memory_summary` は、長いログをランタイムで扱いやすい形に圧縮した記憶要約です。

目的:

- LLMに渡す情報量を制御する
- 行動判定に使いやすくする
- セーブデータを軽量化する
- 再登場時の反応理由を説明可能にする

将来的には、AIによるログ要約の入力・出力先になります。

## behavior_policy

`behavior_policy` は、そのキャラクターが現在どのような行動傾向を持つかを表します。

例:

- avoid_player
- follow_player
- negotiate
- attack_if_cornered
- seek_revenge
- protect_player
- demand_reward

固定人格ではなく、`runtime_state` と `memory_summary` から更新される方針として扱います。

## JSON構造案

```json
{
  "static_profile": {
    "name": "Ayame",
    "role": "wanderer",
    "baseline_traits": ["careful", "warm"],
    "speech_style": "concise"
  },
  "runtime_state": {
    "current_emotion": "alert",
    "trust": 0.4,
    "fear": 0.2,
    "attachment": 0.1
  },
  "growth_log": [],
  "memory_summary": "",
  "behavior_policy": {
    "primary": "observe",
    "fallback": "keep_distance"
  }
}
```

このコンテナは、MPER の「構造が人格出力を制御する」という方針の中心になります。
