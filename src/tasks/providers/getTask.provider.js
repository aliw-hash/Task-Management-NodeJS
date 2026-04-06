const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function getTaskProvider(req, res) {
  const data = matchedData(req);

  try {
    // Defaults for pagination and ordering
    const currentPage = data.page || 1;
    const limit = data.limit || 10;
    const order = data.order || "desc";

    // Count tasks scoped to the current user
    const totalTasks = await Task.countDocuments({
      user: req.user.sub,
      status: { $in: ["todo", "inProgress"] },
    });

    const totalCompletedTasks = await Task.countDocuments({
      user: req.user.sub,
      status: "completed",
    });

    const totalTodoTasks = await Task.countDocuments({
      user: req.user.sub,
      status: "todo",
    });

    const totalInProgressTasks = await Task.countDocuments({
      user: req.user.sub,
      status: "inProgress",
    });

    const totalPages = Math.ceil(totalTasks / limit) || 0;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

    const baseUrl = `${req.protocol}://${req.get("host")}${
      req.originalUrl.split("?")[0]
    }`;

    // Fetch tasks with proper skip logic
    const tasks = await Task.find({
      user: req.user.sub,
      status: { $in: ["todo", "inProgress"] },
    })
      .limit(limit)
      .skip((currentPage - 1) * limit)
      .sort({ createdAt: order === "asc" ? 1 : -1 });

    const finalResponse = {
      data: tasks,
      pagination: {
        meta: {
          itemsPerPage: limit,
          totalItems: totalTasks,
          currentPage: currentPage,
          totalPages: totalPages,
          totalCompletedTasks: totalCompletedTasks,
          totalTodoTasks: totalTodoTasks,
          totalInProgressTasks: totalInProgressTasks,
        },
        links: {
          first: `${baseUrl}/?limit=${limit}&page=1&order=${order}`,
          last: `${baseUrl}/?limit=${limit}&page=${totalPages}&order=${order}`,
          current: `${baseUrl}/?limit=${limit}&page=${currentPage}&order=${order}`,
          previous: prevPage
            ? `${baseUrl}/?limit=${limit}&page=${prevPage}&order=${order}`
            : null,
          next: nextPage
            ? `${baseUrl}/?limit=${limit}&page=${nextPage}&order=${order}`
            : null,
        },
      },
    };

    return res.status(StatusCodes.OK).json(finalResponse);
  } catch (error) {
    errorLogger("Error while fetching tasks", req, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      reason: "Unable to process your request, please try later.",
    });
  }
}

module.exports = getTaskProvider;