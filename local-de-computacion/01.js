const local = {
  vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],

  ventas: [{
      fecha: new Date(2019, 1, 4),
      nombreVendedora: "Grace",
      componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"]
    },
    {
      fecha: new Date(2019, 0, 1),
      nombreVendedora: "Ada",
      componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"]
    },
    {
      fecha: new Date(2019, 0, 2),
      nombreVendedora: "Grace",
      componentes: ["Monitor ASC 543", "Motherboard MZI"]
    },
    {
      fecha: new Date(2019, 0, 10),
      nombreVendedora: "Ada",
      componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"]
    },
    {
      fecha: new Date(2019, 0, 12),
      nombreVendedora: "Grace",
      componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"]
    }
  ],

  precios: [{
      componente: "Monitor GPRS 3000",
      precio: 200
    },
    {
      componente: "Motherboard ASUS 1500",
      precio: 120
    },
    {
      componente: "Monitor ASC 543",
      precio: 250
    },
    {
      componente: "Motherboard ASUS 1200",
      precio: 100
    },
    {
      componente: "Motherboard MZI",
      precio: 30
    },
    {
      componente: "HDD Toyiva",
      precio: 90
    },
    {
      componente: "HDD Wezter Dishital",
      precio: 75
    },
    {
      componente: "RAM Quinston",
      precio: 110
    },
    {
      componente: "RAM Quinston Fury",
      precio: 230
    }
  ]
};

//Florencia Soledad Sosa
//Punto numero 1:
//Se pide desarrollar las siguientes funciones:
//precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido
const precioMaquina = (componentes) => {
  return componentes.reduce((valorPrevio, valorActual) => valorPrevio + local.precios.find(precio => precio.componente === valorActual).precio, 0);
}

//cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.

const cantidadVentasComponente = (componente) => {
  return local.ventas.reduce((cantidadPrevia, venta) => cantidadPrevia + venta.componentes.filter(venta => venta === componente).length, 0);
}

//vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre)

const vendedoraDelMes = (mes, anio) => {
  const ventasPorVendedora = [];
  local.vendedoras.forEach(vendedora => ventasPorVendedora.push({
    nombre: vendedora,
    ventas: 0
  }));

  ventasPorVendedora.forEach(vendedora => vendedora.ventas = ventasPorMes(mes, anio)
    .filter(venta => venta.nombreVendedora === vendedora.nombre)
    .reduce((prev, actual) => prev + precioMaquina(actual.componentes), 0));

  return ventasPorVendedora.sort((a, b) => a.valor + b.valor)[0].nombre;
}

//ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const ventasPorMes = (mes, anio) => {
  return local.ventas.filter(venta => venta.fecha.getFullYear() === anio && venta.fecha.getMonth() + 1 === mes);
}
const ventasMes = (mes, anio) => {
  return ventasPorMes(mes, anio).reduce((prev, actual) => prev + precioMaquina(actual.componentes), 0);
}

//ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha

const ventasVendedora = (nombre) => {
  return local.ventas.filter(venta => venta.nombreVendedora === nombre)
    .reduce((prev, actual) => prev + precioMaquina(actual.componentes), 0);
}

//componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente

const componenteMasVendido = () => {
  const componentes = local.precios.map(precio => ({
    componente: precio.componente,
    vecesComprado: 0
  }));

  const ventasTotales = local.ventas.map(venta => venta.componentes).flat();

  ventasTotales.forEach(venta => {
    const index = componentes.findIndex(componente => componente.componente === venta);
    componentes[index].vecesComprado += 1;
  })
  return componentes.sort((a, b) => a.vecesComprado + b.vecesComprado)[0].componente;
}

//huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero 
//que va desde el 1 (enero) hasta el 12 (diciembre). 

const huboVentas = (mes, anio) => {
  return local.ventas.some(venta => venta.fecha.getMonth() + 1 === mes && venta.fecha.getFullYear() === anio);
}


console.log(precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"])); // 320 ($200 del monitor + $120 del motherboard)
console.log(cantidadVentasComponente("Monitor ASC 543")); // 2
console.log(vendedoraDelMes(1, 2019)); // "Ada" (vendio por $670, una máquina de $320 y otra de $350)
console.log(ventasMes(1, 2019)); // 1250
console.log(ventasVendedora("Grace")); // 900 
console.log(componenteMasVendido()); // Monitor GPRS 3000
console.log(huboVentas(3, 2019)); // false 

//punto 2
//Como se abrió una nueva sucursal en Caballito, ahora los datos de las ventas también tienen el nombre de la sucursal en la cual se realizó. Por ejemplo: { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: 'Centro' }. Por este cambio, se pide:

//En las ventas ya existentes, tenemos que agregar la propiedad sucursal con el valor Centro (ya que es la sucursal original).

//Agregar al objeto principal la propiedad sucursales: ['Centro', 'Caballito']

//Cargar la siguiente información en el array ventas, creando sus respectivos objetos siguiendo el patrón: fecha, nombreVendedora, componentes, sucursal

local.sucursales = ['Centro', 'Caballito'];
local.ventas.forEach(venta => venta.sucursal = 'Centro')
const nuevasVentas = (fecha, nombreVendedora, componentes, sucursal) => {
  local.ventas.push({
    fecha,
    nombreVendedora,
    componentes,
    sucursal
  });
}
nuevasVentas(new Date(2019, 01, 12), "Hedy", ["Monitor GPRS 3000", "HDD Toyiva"], "Centro")
nuevasVentas(new Date(2019, 01, 24), "Sheryl", ["Motherboard ASUS 1500", "HDD Wezter Dishital"], "Caballito")
nuevasVentas(new Date(2019, 01, 01), "Ada", ["Motherboard MZI", "RAM Quinston Fury"], "Centro")
nuevasVentas(new Date(2019, 01, 11), "Grace", ["Monitor ASC 543", "RAM Quinston"], "Caballito")
nuevasVentas(new Date(2019, 01, 15), "Ada", ["Motherboard ASUS 1200", "RAM Quinston Fury"], "Centro")
nuevasVentas(new Date(2019, 01, 12), "Hedy", ["Motherboard ASUS 1500", "HDD Toyiva"], "Caballito")
nuevasVentas(new Date(2019, 01, 21), "Grace", ["Motherboard MZI", "RAM Quinston"], "Centro")
nuevasVentas(new Date(2019, 01, 08), "Sheryl", ["Monitor ASC 543", "HDD Wezter Dishital"], "Centro")
nuevasVentas(new Date(2019, 01, 16), "Sheryl", ["Monitor GPRS 3000", "RAM Quinston Fury"], "Centro")
nuevasVentas(new Date(2019, 01, 27), "Hedy", ["Motherboard ASUS 1200", "HDD Toyiva"], "Caballito")
nuevasVentas(new Date(2019, 01, 22), "Grace", ["Monitor ASC 543", "HDD Wezter Dishital"], "Centro")
nuevasVentas(new Date(2019, 01, 05), "Ada", ["Motherboard ASUS 1500", "RAM Quinston"], "Centro")
nuevasVentas(new Date(2019, 01, 01), "Grace", ["Motherboard MZI", "HDD Wezter Dishital"], "Centro")
nuevasVentas(new Date(2019, 01, 07), "Sheryl", ["Monitor GPRS 3000", "RAM Quinston"], "Caballito")
nuevasVentas(new Date(2019, 01, 14), "Ada", ["Motherboard ASUS 1200", "HDD Toyiva"], "Centro")


//

const ventasSucursal = (sucursal) => {
  return local.ventas.filter(venta => venta.sucursal === sucursal).reduce((prev, actual) => prev + precioMaquina(actual.componentes), 0)
}


//Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
const sucursalDelMes = (mes, anio) => {
  const ventasEnFecha = local.ventas.filter(venta => venta.fecha.getFullYear() === anio && venta.fecha.getMonth() + 1 === mes);
  const ventasPorSucursal = [];
  local.sucursales.forEach(sucursal => ventasPorSucursal.push({
    sucursal,
    ventas: 0
  }));

  ventasPorSucursal.forEach(ventaSucursal => ventaSucursal.ventas = ventasEnFecha
    .filter(venta => venta.sucursal === ventaSucursal.sucursal)
    .reduce((prev, act) => prev + precioMaquina(act.componentes), 0));

  ventasPorSucursal.sort((a, b) => a.ventas + b.ventas);
  return ventasPorSucursal[0].sucursal;
}
//punto 3
//Para tener una mejor muestra de como está resultando el local, queremos desarrollar un reporte que nos muestre las ventas por sucursal y por mes. Para esto, necesitamos crear las siguientes funciones:
//renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año
const renderPorMes = () => {
  let resultado = '';
  let meses = {
    mesEnNumero: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    mesEnPalabra: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto",
      "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ],
  }

  for (i = 0; i < meses.mesEnNumero.length; i++) {
    if (huboVentas(meses.mesEnNumero[i], 2019)) {
      resultado = resultado + "El mes de" + meses.mesEnPalabra[i] + " vendió: " + ventasMes(meses.mesEnNumero[i], 2019) + ". ";
    }
  }
  return resultado;
}

//renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal
const renderPorSucursal = () => {
  let resultado = "";
  for (i = 0; i < local.sucursales.length; i++) {
    resultado += "El local " + local.sucursales[i] + " vendió: " + ventasSucursal(local.sucursales[i]) + ". ";
  }
  return resultado;
}
//render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó
const render = () => {
  let general = [];

  for (i = 0; i < local.vendedoras.length; i++) {
    vendioVendedora = {
      nombre: local.vendedoras[i],
      vendio: 0,
    }
    vendioVendedora.vendio = vendioVendedora.vendio + ventasVendedora(local.vendedoras[i])
    general.push(vendioVendedora)
  }


  let vendedoraMaxima;
  let ventaMaxima = 0

  for (n = 0; n < general.length; n++) {
    if (ventaMaxima < general[n].vendio) {
      ventaMaxima = general[n].vendio;
      vendedoraMaxima = general[n].nombre;
    }
  }
 
  let listaFinal = `
  \n Ventas por mes
  \n${renderPorMes()}
  \n------------------------------------------
  \n Ventas por sucursal
  \n${renderPorSucursal()}
  \n------------------------------------------
  \nProducto estrella: ${componenteMasVendido()}
  \n------------------------------------------
  \nVendedora que más ingresos generó: ${vendedoraMaxima}`

  return listaFinal;

}


console.log(ventasSucursal("Centro")); // 4195
console.log(sucursalDelMes(2, 2019)); // "Centro"
console.log(renderPorMes());
// Ventas por mes:
//   Total de enero 2019: 1250
//   Total de febrero 2019: 4210
console.log(renderPorSucursal());
// Ventas por sucursal:
//   Total de Centro: 4195
//   Total de Caballito: 1265
console.log(render());
// Reporte
// Ventas por mes:
//   Total de enero 2019: 1250
//   Total de febrero 2019: 4210
// Ventas por sucursal:
//   Total de Centro: 4195
//   Total de Caballito: 1265
// Producto estrella: Monitor GPRS 3000
// Vendedora que más ingresos generó: Grace