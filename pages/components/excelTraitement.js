function replaceNestedIf(expression) {
    let oldExpression = '';
    while (expression !== oldExpression) {
      oldExpression = expression;
      expression = expression.replace(/IF\(([^,]*),([^,]*),([^)]*)\)/g, function(match, p1, p2, p3) {
        return `(${p1} ? ${p2} : ${p3})`;
      });
    }
    return expression;
  }

export function removeExcelFunctions(expression) {
    // Supprimer les expressions de la forme Calc!10
    expression = expression.replace(/Calc!M10\d+/g,1);
    expression = expression.replace(/Calc!O10\d+/g,"MOD_True");
    expression = expression.replace(/Calc!O34\d+/g,0);
    expression = expression.replace(/Calc!O32\d+/g,0);
    expression = expression.replace(/Calc!C4\d+/g,/runeStats["ForceBit"] == 1 ? runeStats["Adaptive"] : 0\d+/g);
    expression = expression.replace(/Calc!C5\d+/g,/basicStatsChampion["Attack Damage"]\d+/g);
    expression = expression.replace(/Calc!C49\d+/g,false);
    expression = expression.replace(/Calc!I7\d+/g,/additionnalStats["Mana"]\d+/g);
    expression = expression.replace(/Calc!O31\d+/g,"IT_Proc_Phys");
    expression = expression.replace(/Y\d+/g, "passiveDamage");
    expression = expression.replace(/VLOOKUP\(Name,Champs!A2:AE200,31,FALSE\)/g, 'data["Melee?"] == 1');
    expression = expression.replace(/TRUE/g, "1");
    expression = expression.replace(/FALSE/g, "0");
    expression = expression.replace(/OR\(([^;]*),([^;]*)\)/g, function(match, p1, p2) {
        // p1 et p2 correspondent respectivement aux deux arguments de OR.
        return `(${p1} | ${p2})`;
    });

    expression = expression.replace(/AND\(([^;]*),([^;]*)\)/g, function(match, p1, p2) {
        // p1 et p2 correspondent respectivement aux deux arguments de OR.
        return `(${p1} & ${p2})`;
    });


    // Supprimer les expressions de la forme SI(...)
    expression = replaceNestedIf(expression);
    expression = expression.replace(/IF\(([^,]*),([^,]*),([^)]*)\)/g, function(match, p1, p2, p3) {
        // p1, p2 et p3 correspondent respectivement aux trois arguments de IF.
        return `(${p1} ? ${p2} : ${p3})`;
    });
    expression = expression.replace(/IF\(([^;]*),([^;]*),([^\)]*)\)/g, function(match, p1, p2, p3) {
        // p1, p2 et p3 correspondent respectivement aux trois arguments de SI.
        return `(${p1} ? ${p2} : ${p3})`;
      });
    expression = expression.replace(/IF\(([^;]*),([^;]*)\)/g, function(match, p1, p2) {
        // p1, p2 et p3 correspondent respectivement aux trois arguments de SI.
        return `(${p1} ? ${p2} : 0)`;
      });
      expression = expression.replace(/IF\(([^;]*),([^;]*),([^\)]*)\)/g, function(match, p1, p2, p3) {
        // p1, p2 et p3 correspondent respectivement aux trois arguments de IF.
        return `(${p1} ? ${p2} : ${p3})`;
    });
    // Supprimer les expressions de la forme MAX(...)
    expression = expression.replace(/MAX/g, "max");
    expression = expression.replace(/MIN/g, "min");
    expression = expression.replace(/ARRONDI.INF\([^)]*\)/g, /Math.floor\+/g);
    expression = expression.replace(/Interface!$L$28\([^)]*\)/g, "");
    
    if (expression.includes('%')){
        expression = parseFloat(expression) / 100
    }
    return expression;
}
