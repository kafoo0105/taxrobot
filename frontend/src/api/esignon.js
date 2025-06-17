export const startEsignonWorkflow = async ({ workflowName, templateId, recipient, fieldList }) => {
  try {
    const res = await fetch('https://docs.esignon.net/api/v3/workflows/start?offset=%2B09%3A00', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `esignon ${process.env.REACT_APP_ESIGNON_TOKEN}`
      },
      body: JSON.stringify({
        language: 'ko',
        is_preview: false,
        export_api_info: {
          url: 'https://webhook.site/3eecb197-bcba-4d20-b610-e9d4185b53ab',
          api_type: 'ALL',
          is_embed: true
        },
        workflow_name: workflowName,
        template_id: templateId,
        recipient_list: [recipient],
        field_list: fieldList
      })
    });

    return await res.json();
  } catch (err) {
    console.error('이싸인온 워크플로우 생성 실패:', err);
    throw err;
  }
};
