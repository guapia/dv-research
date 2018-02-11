/// <reference path="../../base.ts" />



namespace android.test.cartesian {
    import Util = android.graphics.Util;
    'use strict';
    export class Filter {
        public series: string[];
        public rules: Rule[];

        constructor(series: string, rules: any) {
            this.series = series.split(',');
            if (rules != null && rules instanceof Array) {
                this.rules = [];
                for (let rule of rules) {
                    this.rules.push(new Rule(rule.field, rule.express));
                }
            }
        }

        equals(field: Field): boolean {
            return _.isEqual(this, field);
        }
    }
    export class Rule {
        public express: string;
        public filed: string;
        constructor(filed: string, express: string) {

            this.filed = filed;
            this.express = express;
        }
    }
}
