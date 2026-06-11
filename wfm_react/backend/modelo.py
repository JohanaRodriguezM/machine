"""
WFM Falabella — Motor de proyección
Lógica: comportamiento base 2026 × índice diario 2025 × escalado a meta
Erlang C para FTEs por hora
Output: 24 horas completas para todos los días y colas
"""
import pandas as pd
import numpy as np
from math import factorial, exp
import warnings
warnings.filterwarnings('ignore')

# ── Erlang C ───────────────────────────────────────────────────────────────────
def erlang_c(n, a):
    if n <= a: return 1.0
    try:
        s = sum(a**k / factorial(int(k)) for k in range(int(n)))
        t = (a**n / factorial(int(n))) * (n / (n - a))
        return t / (s + t)
    except: return 1.0

def nivel_servicio(n, a, tmo_seg, sla_seg):
    if n <= a or a == 0: return 0.0 if a > 0 else 1.0
    return 1 - erlang_c(n, a) * exp(-(n - a) * (1 / tmo_seg) * sla_seg)

def agentes_erlang(llamadas_hora, tmo_min, ns_target, sla_seg):
    if llamadas_hora <= 0: return 0
    tmo_seg = tmo_min * 60
    a = (llamadas_hora * tmo_seg) / 3600
    n = max(1, int(a) + 1)
    for _ in range(500):
        if nivel_servicio(n, a, tmo_seg, sla_seg) >= ns_target:
            return n
        n += 1
    return n

# ── Configuración ──────────────────────────────────────────────────────────────
ERLANG_PARAMS = {
    'Whatsapp': {'tmo': 8.5, 'ns': 0.85, 'sla': 55, 'ocup': 0.85},
    'Phone':    {'tmo': 6.5, 'ns': 0.85, 'sla': 15, 'ocup': 0.80},
}

COLA_INFO = {
    'VQ_FALABELLA_SAC_ATENTO_PE':   {'venture':'FAPE','canal':'Phone'},
    'VQ_FALABELLA_SAC_WEBHELP_CO':  {'venture':'FACO','canal':'Phone'},
    'VQ_FCOM_ATENTO_WSP_CH':        {'venture':'FACL','canal':'Whatsapp'},
    'VQ_FCOM_SAC_ATENTO_CH':        {'venture':'FACL','canal':'Phone'},
    'VQ_FCOM_SAC_ATENTO_CO':        {'venture':'FACO','canal':'Phone'},
    'VQ_FCOM_SAC_ATENTO_PE':        {'venture':'FAPE','canal':'Phone'},
    'VQ_FCOM_SAC_INHOUSE_CH':       {'venture':'FACL','canal':'Phone'},
    'VQ_FCOM_SAC_INHOUSE_CO':       {'venture':'FACO','canal':'Phone'},
    'VQ_FCOM_WSP_DEVOFFLINE_CO':    {'venture':'FACO','canal':'Whatsapp'},
    'VQ_FCOM_WSP_SAC_CO':           {'venture':'FACO','canal':'Whatsapp'},
    'VQ_FCOM_WSP_SAC_PE':           {'venture':'FAPE','canal':'Whatsapp'},
    'VQ_SODCOM_ATENTO_WSP_SAC_CH':  {'venture':'SOCL_SODCOM','canal':'Whatsapp'},
    'VQ_SODCOM_SAC_ATENTO_CH':      {'venture':'SOCL_SODCOM','canal':'Phone'},
    'VQ_SODCOM_SAC_INHOUSE_CH':     {'venture':'SOCL_SODCOM','canal':'Phone'},
    'VQ_SODCOM_SAC_PE':             {'venture':'SOPE','canal':'Phone'},
    'VQ_SODCOM_WSP_DEVOFFLINE_PE':  {'venture':'FAPE','canal':'Whatsapp'},
    'VQ_SODCOM_WSP_SAC_PE':         {'venture':'SOPE','canal':'Whatsapp'},
    'VQ_SODIMAC_OZOM_CH':           {'venture':'SOCL_TIENDAS','canal':'Phone'},
    'VQ_SODIMAC_SAC_AR':            {'venture':'SAC_AR','canal':'Phone'},
    'VQ_SODIMAC_SAC_INHOUSE_CH':    {'venture':'SOCL_TIENDAS','canal':'Phone'},
    'VQ_SODIMAC_SAC_UY':            {'venture':'SAC_UY','canal':'Phone'},
    'VQ_SODIMAC_SERVICIOS_ATENTO_PE':{'venture':'SOPE_INSTALACIONES','canal':'Phone'},
    'VQ_SODIMAC_UNIFICAR_CANALES_DE_ATENCION_ASESORIAC_WSP_CH':{'venture':'SOCL_TS','canal':'Whatsapp'},
    'VQ_SODIMAC_UNIFICAR_CANALES_DE_ATENCION_COMPRAR_WSP_CH':  {'venture':'SOCL_TS','canal':'Whatsapp'},
    'VQ_SODIMAC_UNIFICAR_CANALES_DE_ATENCION_HERRAMIENTAS_WSP_CH':{'venture':'SOCL_TS','canal':'Whatsapp'},
    'VQ_SODIMAC_VENTA_ARMADO_CH':   {'venture':'SOCL_TS','canal':'Phone'},
    'VQ_SODIMAC_VENTA_TELEFONICA_CE_CH':         {'venture':'SOCL_TS','canal':'Phone'},
    'VQ_SODIMAC_VENTA_TELEFONICA_CH':            {'venture':'SOCL_TS','canal':'Phone'},
    'VQ_SODIMAC_VENTA_TELEFONICA_ESPECIALISTA_CH':{'venture':'SOCL_TS','canal':'Phone'},
    'VQ_SODIMAC_VENTA_TELEFONICA_PROYECTO_CH':   {'venture':'SOCL_TS','canal':'Phone'},
    'VQ_SODIMAC_VENTAS_AR':         {'venture':'VENTAS_AR','canal':'Phone'},
    'VQ_SODIMAC_VENTAS_UY':         {'venture':'VENTAS_UY','canal':'Phone'},
    'VQ_SODIMAC_WSP_HSM_CLIENTE_HOGAR_AR':{'venture':'MAT_AR','canal':'Phone'},
    'VQ_SODIMAC_WSP_HSM_CLIENTE_HOGAR_UY':{'venture':'MAT_UY','canal':'Phone'},
    'VQ_SODIMAC_WSP_SAC_AR':        {'venture':'SAC_AR','canal':'Whatsapp'},
    'VQ_SODIMAC_WSP_SAC_CH':        {'venture':'SOCL_TIENDAS','canal':'Whatsapp'},
    'VQ_SODIMAC_WSP_SAC_UY':        {'venture':'SAC_UY','canal':'Whatsapp'},
    'VQ_TOTTUS_SAC_ATENTO_CH':      {'venture':'TOCL','canal':'Phone'},
    'VQ_TOTTUS_SAC_ATENTO_PE':      {'venture':'TOPE','canal':'Phone'},
    'VQ_TOTTUS_SAC_OPC3_ATENTO_CH': {'venture':'TOCL','canal':'Phone'},
    'VQ_TOTTUS_WSP_SAC_CH':         {'venture':'TOCL','canal':'Whatsapp'},
    'VQ_TOTTUS_WSP_SAC_PE':         {'venture':'TOPE','canal':'Whatsapp'},
}

VENTURES_SIN_META = {'SAC_AR','SAC_UY','SOPE_INSTALACIONES','VENTAS_AR','VENTAS_UY','MAT_AR','MAT_UY'}
HORAS_DIA = list(range(24))  # 0 a 23 siempre


def proyectar_mes(df_hist, año_proj, mes_proj, metas_venture, erlang_params=None):
    if erlang_params is None:
        erlang_params = ERLANG_PARAMS

    import calendar as cal
    n_dias = cal.monthrange(año_proj, mes_proj)[1]
    fechas_proj = pd.date_range(f'{año_proj}-{mes_proj:02d}-01', periods=n_dias)

    # ── PASO 1: Base 2026 — promedio por cola × dow × hora (todas las 24h) ─────
    df_2026 = df_hist[df_hist['año'] == 2026].copy()
    meses_2026 = sorted(df_2026['mes'].unique())[-3:]
    df_base = df_2026[df_2026['mes'].isin(meses_2026)].copy()

    # Construir grilla completa cola × dow × hora con promedio (0 si no hay datos)
    perfiles = {}
    for cola in COLA_INFO:
        sub = df_base[df_base['Cola'] == cola]
        if sub.empty:
            # Fallback: todo el histórico de esa cola
            sub = df_hist[df_hist['Cola'] == cola]

        if sub.empty:
            # Sin datos: perfil todo ceros
            perfiles[cola] = pd.DataFrame(
                [(dow, h, 0.0) for dow in range(7) for h in HORAS_DIA],
                columns=['dow','Hora','base_hora']
            )
        else:
            piv = (sub.groupby(['dow','Hora'])['Entrantes']
                   .mean()
                   .reset_index()
                   .rename(columns={'Entrantes':'base_hora'}))
            # Completar con todas las combinaciones dow × hora, rellenando 0
            full = pd.DataFrame(
                [(dow, h) for dow in range(7) for h in HORAS_DIA],
                columns=['dow','Hora']
            )
            piv = full.merge(piv, on=['dow','Hora'], how='left').fillna(0)
            perfiles[cola] = piv

    # ── PASO 2: Índice diario 2025 por cola ────────────────────────────────────
    df_2025_mes = df_hist[(df_hist['año'] == 2025) & (df_hist['mes'] == mes_proj)].copy()
    daily_2025 = df_2025_mes.groupby(['Cola','Fecha'])['Entrantes'].sum().reset_index()
    daily_2025['dia_num'] = daily_2025['Fecha'].dt.day
    avg_mes_2025 = daily_2025.groupby('Cola')['Entrantes'].mean().rename('avg_mes')
    daily_2025 = daily_2025.join(avg_mes_2025, on='Cola')
    daily_2025['idx_dia'] = np.where(
        daily_2025['avg_mes'] > 0,
        daily_2025['Entrantes'] / daily_2025['avg_mes'], 1.0
    )
    idx_2025 = {}
    for _, row in daily_2025.iterrows():
        idx_2025.setdefault(row['Cola'], {})[row['dia_num']] = row['idx_dia']

    # ── PASO 3: Proyección cruda — 24h × cada día × cada cola ─────────────────
    resultados = []
    for cola, info in COLA_INFO.items():
        venture = info['venture']
        canal   = info['canal']
        ep      = erlang_params.get(canal, erlang_params.get('Phone', ERLANG_PARAMS['Phone']))
        perf    = perfiles[cola]

        for fecha in fechas_proj:
            dow     = fecha.dayofweek
            dia_num = fecha.day
            idx     = idx_2025.get(cola, {}).get(dia_num, 1.0)
            perf_dow = perf[perf['dow'] == dow].set_index('Hora')['base_hora']

            for hora in HORAS_DIA:
                base     = float(perf_dow.get(hora, 0.0))
                proj_crudo = max(0.0, base * idx)
                resultados.append({
                    'Cola':       cola,
                    'Venture':    venture,
                    'Canal':      canal,
                    'Fecha':      fecha,
                    'Hora':       hora,
                    'proj_crudo': proj_crudo,
                    'tmo':        ep['tmo'],
                    'ns':         ep['ns'],
                    'sla':        ep['sla'],
                })

    df_proj = pd.DataFrame(resultados)

    # ── PASO 4: Escalar a meta por venture ─────────────────────────────────────
    total_crudo = df_proj.groupby('Venture')['proj_crudo'].sum()
    df_proj['factor_escala'] = df_proj['Venture'].map(
        lambda v: (metas_venture[v] / total_crudo[v])
        if v in metas_venture and v not in VENTURES_SIN_META and total_crudo.get(v, 0) > 0
        else 1.0
    )
    df_proj['Proyeccion'] = (df_proj['proj_crudo'] * df_proj['factor_escala']).round(2)

    # ── PASO 5: Erlang C → FTEs (0 si no hay llamadas) ─────────────────────────
    df_proj['Ftes'] = df_proj.apply(
        lambda r: agentes_erlang(r['Proyeccion'], r['tmo'], r['ns'], r['sla'])
        if r['Proyeccion'] > 0 else 0,
        axis=1
    )

    return df_proj[['Cola','Venture','Canal','Fecha','Hora','Proyeccion','Ftes']]\
        .sort_values(['Cola','Fecha','Hora']).reset_index(drop=True)

print("modelo.py OK — 24h completas")
