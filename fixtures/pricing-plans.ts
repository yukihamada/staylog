// StayLogの料金プラン（Stripeで実際に設定する前のモックデータ）
export const pricingPlans = [
  {
    id: 'basic',
    name: 'Basic',
    description: '小規模な宿泊施設向けの基本プラン',
    features: [
      '1施設での利用',
      '月間100件の宿泊者登録',
      '基本的な宿泊者情報管理',
      'メールサポート'
    ],
    prices: {
      month: {
        amount: 980,
        currency: 'JPY',
        id: 'price_basic_monthly'
      },
      year: {
        amount: 9800,
        currency: 'JPY',
        id: 'price_basic_yearly'
      }
    }
  },
  {
    id: 'standard',
    name: 'Standard',
    description: '中規模な宿泊施設向けの標準プラン',
    features: [
      '最大3施設での利用',
      '月間500件の宿泊者登録',
      '高度な分析機能',
      '複数言語対応',
      'メール・チャットサポート'
    ],
    prices: {
      month: {
        amount: 2980,
        currency: 'JPY',
        id: 'price_standard_monthly'
      },
      year: {
        amount: 29800,
        currency: 'JPY',
        id: 'price_standard_yearly'
      }
    }
  },
  {
    id: 'professional',
    name: 'Professional',
    description: '大規模な宿泊施設向けのプロフェッショナルプラン',
    features: [
      '無制限の施設数',
      '無制限の宿泊者登録',
      'API連携',
      'カスタムフォーム作成',
      '優先サポート',
      '専任アカウントマネージャー'
    ],
    prices: {
      month: {
        amount: 9800,
        currency: 'JPY',
        id: 'price_professional_monthly'
      },
      year: {
        amount: 98000,
        currency: 'JPY',
        id: 'price_professional_yearly'
      }
    }
  }
];