function replaceNestedIf(expression) {
    let oldExpression = '';
    while (expression !== oldExpression) {
      oldExpression = expression;
      expression = expression.replace(/IF\(([^,]*?),((?:[^,]|,[^,]*?)*),([^)]*)\)/g, function(match, p1, p2, p3) {
        return `(${p1} ? ${p2} : ${p3})`;
      });
    }
    return expression;
  }

export function removeExcelFunctions(expression) {
    // Supprimer les expressions de la forme Calc!10
    expression = expression.replace(/Calc!M10/g,1);
    expression = expression.replace(/Calc!O10/g,"MOD_True");
    expression = expression.replace(/Calc!O34/g,0);
    expression = expression.replace(/Calc!O32/g,0);
    expression = expression.replace(/Calc!O32/g,0);
    expression = expression.replace(/Calc!C4/g,"ForceBit== 1 ? R_Adap : 0");
    expression = expression.replace(/Calc!C5/g,"Self_BaAD");
    expression = expression.replace(/Calc!I32/g,false);
    expression = expression.replace(/Calc!I7/g,"Self_BoMP");
    expression = expression.replace(/Calc!O31/g,"IT_Proc_Phys");
    
    expression = expression.replace(/VLOOKUP\(Name,Champs!A2:AE200,31,FALSE\)/g, 'data["Melee?"] == 1');
    expression = expression.replace(/TRUE/g, "1");
    expression = expression.replace(/FALSE/g, "0");
    expression = expression.replace(/NOT/g, "not");
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
    expression = expression.replace(/IF\(([^,]*),((?:[^,]|,[^,]*)*),([^)]*)\)/g, function(match, p1, p2, p3) {
      if (p3)
        return `(${p1} ? ${p2} : ${p3})`;
      return `(${p1} ? ${p2} : 0)`
    });
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
    
    //Supprimer les expressions de la forme MAX(...)
    expression = expression.replace(/MAX/g, "max");
    expression = expression.replace(/MIN/g, "min");
    expression = expression.replace(/Math.max/g, "max");
    expression = expression.replace(/Math.min/g, "min");
    expression = expression.replace(/ARRONDI.INF/g, "floor");
    expression = expression.replace(/Math.floor/g, "floor");
    expression = expression.replace(/Interface!$L$28\([^)]*\)/g, "");
    expression = expression.replace(/(max|min)\(([^)]*)\)/g, function(match, func, args) {
      // Replace ":" with "," in the arguments of MAX/MIN
      args = args.replace(/:/g, ',');
      return `${func}(${args})`;
    });
    expression = expression.replace(/(?<=\d),(?=\d)/g, ".");
    if (expression.includes('%')){
        expression = parseFloat(expression) / 100
    }
    return expression;
}
