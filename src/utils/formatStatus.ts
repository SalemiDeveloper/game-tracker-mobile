export function formatStatus(status: string) {
        const labels: Record<string, string> = {
            vou_jogar:      'Vou jogar',
            jogando:        'Jogando',
            zerei:          'Zerei',
            '100_porcento': '100%',
            platinei:       'Platinei',
            abandonei:      'Abandonei'
        };

        return (labels[status] ?? status);
    }